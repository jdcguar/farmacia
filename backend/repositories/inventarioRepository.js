const db = require('../config/database');
const oracledb = require('oracledb');

const obtenerActivos = async () => {
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
        return result.rows;
    } finally {
        if (connection) { try { await connection.close(); } catch (err) {} }
    }
};

const crear = async (nombre, stock, sucursal_id) => {
    let connection;
    try {
        connection = await db.getConnection();
        const result = await connection.execute(
            `INSERT INTO INVENTARIO_MEDICAMENTOS (NOMBRE, STOCK, SUCURSAL_ID) VALUES (:1, :2, :3)`,
            [nombre, stock, sucursal_id],
            { autoCommit: true }
        );
        return result;
    } finally {
        if (connection) { try { await connection.close(); } catch (err) {} }
    }
};

const actualizar = async (id, nombre, stock, sucursal_id) => {
    let connection;
    try {
        connection = await db.getConnection();
        const result = await connection.execute(
            `UPDATE INVENTARIO_MEDICAMENTOS 
             SET NOMBRE = :1, STOCK = :2, SUCURSAL_ID = :3 
             WHERE ID = :4 AND ESTADO = 1`,
            [nombre, stock, sucursal_id, id],
            { autoCommit: true }
        );
        return result;
    } finally {
        if (connection) { try { await connection.close(); } catch (err) {} }
    }
};

const eliminarLogico = async (id) => {
    let connection;
    try {
        connection = await db.getConnection();
        const result = await connection.execute(
            `UPDATE INVENTARIO_MEDICAMENTOS SET ESTADO = 0 WHERE ID = :1`,
            [id],
            { autoCommit: true }
        );
        return result;
    } finally {
        if (connection) { try { await connection.close(); } catch (err) {} }
    }
};

module.exports = {
    obtenerActivos,
    crear,
    actualizar,
    eliminarLogico
};