const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: 'ROOT',
    database: 'banner_db'
});

const promisePool = pool.promise();

module.exports = promisePool;
