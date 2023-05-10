const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'DBClass',
    password: '1234'
});

module.exports = db;