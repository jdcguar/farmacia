const oracledb = require('oracledb');
const db = require('../config/database');

// obtener (GET)
const obtenerInventario = async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const result = await connection.execute(
            `SELECT I.ID, I.NOMBRE, I.STOCK, I.SUCURSAL_ID, S.NOMBRE AS SUCURSAL_NOMBRE 
             FROM INVENTARIO_MEDICAMENTOS I
             JOIN SUCURSALES S ON I.SUCURSAL_ID = S.ID
             WHERE I.ESTADO = 1`,
            [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al consultar la base de datos' });
    } finally {
        if (connection) {
            try { await connection.close(); } catch (err) { console.error(err); }
        }
    }
};

// crear (POST)
const crearMedicamento = async (req, res) => {
  const { nombre, stock, sucursal_id } = req.body;

  if (!nombre || nombre.trim() === "")
    return res.status(400).json({ error: "El nombre no puede estar vacío." });
  if (stock === undefined || stock < 0 || !Number.isInteger(Number(stock)))
    return res.status(400).json({ error: "El stock debe ser un número entero y no negativo." });
  if (!sucursal_id || isNaN(sucursal_id))
    return res
      .status(400)
      .json({ error: "Debe seleccionar una sucursal válida." });

  let connection;
  try {
    connection = await db.getConnection();
    await connection.execute(
      `INSERT INTO INVENTARIO_MEDICAMENTOS (NOMBRE, STOCK, SUCURSAL_ID) VALUES (:1, :2, :3)`,
      [nombre, stock, sucursal_id],
      { autoCommit: true },
    );
    res.status(201).json({ message: "Medicamento guardado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al guardar en BD" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {}
    }
  }
};

// DELETE
const eliminarMedicamento = async (req, res) => {
    // Extraemos el ID que viene en la URL
    const { id } = req.params;
    let connection;

    try {
        connection = await db.getConnection();

        const result = await connection.execute(
            `UPDATE INVENTARIO_MEDICAMENTOS SET ESTADO = 0 WHERE ID = :1`,
            [id],
            { autoCommit: true }
        );

        // Verificamos si realmente se borró algo (por si envían un ID que no existe)
        if (result.rowsAffected === 0) {
            return res.status(404).json({ message: 'Medicamento no encontrado' });
        }

        res.json({ message: 'Medicamento eliminado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar en la base de datos' });
    } finally {
        if (connection) {
            try { await connection.close(); } catch (err) { console.error(err); }
        }
    }
};

//  actualizar (PUT)
const actualizarMedicamento = async (req, res) => {
  const { id } = req.params;
  const { nombre, stock, sucursal_id } = req.body;

  if (!nombre || nombre.trim() === "")
    return res.status(400).json({ error: "El nombre no puede estar vacío." });
  if (stock === undefined || stock < 0 || !Number.isInteger(Number(stock)))
    return res.status(400).json({ error: "Stock inválido." });
  if (!sucursal_id || isNaN(sucursal_id))
    return res
      .status(400)
      .json({ error: "Debe seleccionar una sucursal válida." });

  let connection;
  try {
    connection = await db.getConnection();
    const result = await connection.execute(
      `UPDATE INVENTARIO_MEDICAMENTOS 
             SET NOMBRE = :1, STOCK = :2, SUCURSAL_ID = :3 
             WHERE ID = :4 AND ESTADO = 1`,
      [nombre, stock, sucursal_id, id],
      { autoCommit: true },
    );
    if (result.rowsAffected === 0)
      return res.status(404).json({ message: "Medicamento no encontrado" });
    res.json({ message: "Actualizado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar en BD" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {}
    }
  }
};

module.exports = {
    obtenerInventario,
    crearMedicamento,
    eliminarMedicamento,
    actualizarMedicamento
};