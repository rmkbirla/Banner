const mysql = require('mysql2');
const { URL } = require('url');

// Connection string
const connectionString = 'mysql://root:vAPwyjyVJNMRBeZgpFZjpyagSCqyRQza@mysql.railway.internal:3306/railway';

// Parse the connection string
const url = new URL(connectionString);
const [user, password] = url.username ? [url.username, url.password] : [null, null];

const pool = mysql.createPool({
    host: url.hostname,
    user: user,
    password: password,
    database: url.pathname.substring(1),
    port: url.port || 3306,
    // If you're using a newer version of Node.js and `mysql2`, you might want to add the following option for connection pooling
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

module.exports = promisePool;

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root', 
//     password: 'ROOT',
//     database: 'banner_db'
// });

// const promisePool = pool.promise();

// module.exports = promisePool;