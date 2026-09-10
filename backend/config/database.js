const oracledb = require('oracledb');

async function getConnection() {
    return await oracledb.getConnection({
        user: process.env.DB_USER || 'system',
        password: process.env.DB_PASSWORD || 'Admin123Password',
        connectString: process.env.DB_CONNECTION || 'localhost/XE'
    });
}

module.exports = { getConnection };