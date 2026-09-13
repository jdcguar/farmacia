const db = require('../config/database');
const oracledb = require('oracledb');

const obtenerTodasActivas = async () => {
    let connection;
    try {
        connection = await db.getConnection();
        const result = await connection.execute(
            `SELECT ID, NOMBRE FROM SUCURSALES WHERE ESTADO = 1 ORDER BY NOMBRE`,
            [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
        return result.rows;
    } finally {
        if (connection) {
            try { await connection.close(); } catch (err) { console.error(err); }
        }
    }
};

module.exports = { obtenerTodasActivas };
