const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'banner.railway.internal',
    user: 'root', 
    password: 'vAPwyjyVJNMRBeZgpFZjpyagSCqyRQza',
    database: 'railway'
});

const promisePool = pool.promise();

module.exports = promisePool;
