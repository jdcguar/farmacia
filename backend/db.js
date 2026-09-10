const oracledb = require('oracledb');
require('dotenv').config();

async function initialize() {
    try {
        await oracledb.createPool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.DB_CONNECTION_STRING,
            poolMin: 2,
            poolMax: 10,
            poolIncrement: 2
        });
        console.log('Conexión a Oracle XE establecida con éxito.');
    } catch (err) {
        console.error('Error inicializando la base de datos:', err);
    }
}

module.exports = { initialize };