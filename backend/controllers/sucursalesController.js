const db = require("../config/database");
const oracledb = require("oracledb");

const obtenerSucursales = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    // Traemos las sucursales activas ordenadas alfabéticamente
    const result = await connection.execute(
      `SELECT ID, NOMBRE FROM SUCURSALES WHERE ESTADO = 1 ORDER BY NOMBRE`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener sucursales:", err);
    res.status(500).json({ error: "Error al consultar las sucursales" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};

module.exports = { obtenerSucursales };
