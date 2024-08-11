const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'RAILWAY_PRIVATE_DOMAIN',
    user: 'root', 
    password: 'vAPwyjyVJNMRBeZgpFZjpyagSCqyRQza',
    database: 'mysql'
});

const promisePool = pool.promise();

module.exports = promisePool;
