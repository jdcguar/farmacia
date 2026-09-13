const inventarioRepository = require("../repositories/inventarioRepository");

const obtenerInventario = async (req, res) => {
  try {
    const medicamentos = await inventarioRepository.obtenerActivos();
    res.json(medicamentos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al consultar la base de datos" });
  }
};

const crearMedicamento = async (req, res) => {
  const { nombre, stock, sucursal_id } = req.body;

  // Capa de Seguridad: Validaciones estrictas
  if (!nombre || nombre.trim() === "")
    return res.status(400).json({ error: "El nombre no puede estar vacío." });
  if (stock === undefined || stock < 0 || !Number.isInteger(Number(stock)))
    return res.status(400).json({ error: "Stock inválido." });
  if (!sucursal_id || isNaN(sucursal_id))
    return res
      .status(400)
      .json({ error: "Debe seleccionar una sucursal válida." });

  try {
    await inventarioRepository.crear(nombre, stock, sucursal_id);
    res.status(201).json({ message: "Medicamento guardado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al guardar en BD" });
  }
};

const actualizarMedicamento = async (req, res) => {
  const { id } = req.params;
  const { nombre, stock, sucursal_id } = req.body;

  // Capa de Seguridad: Validaciones estrictas
  if (!nombre || nombre.trim() === "")
    return res.status(400).json({ error: "El nombre no puede estar vacío." });
  if (stock === undefined || stock < 0 || !Number.isInteger(Number(stock)))
    return res.status(400).json({ error: "Stock inválido." });
  if (!sucursal_id || isNaN(sucursal_id))
    return res
      .status(400)
      .json({ error: "Debe seleccionar una sucursal válida." });

  try {
    const result = await inventarioRepository.actualizar(
      id,
      nombre,
      stock,
      sucursal_id,
    );
    if (result.rowsAffected === 0)
      return res
        .status(404)
        .json({ message: "Medicamento no encontrado o inactivo" });
    res.json({ message: "Actualizado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar en BD" });
  }
};

const eliminarMedicamento = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await inventarioRepository.eliminarLogico(id);
    if (result.rowsAffected === 0)
      return res.status(404).json({ message: "Medicamento no encontrado" });
    res.json({ message: "Medicamento eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar en la base de datos" });
  }
};

module.exports = {
  obtenerInventario,
  crearMedicamento,
  actualizarMedicamento,
  eliminarMedicamento,
};
