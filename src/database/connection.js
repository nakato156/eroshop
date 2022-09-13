const mysql = require('mysql')
const {promisify} = require('util')

const options = {
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASS,
    port: process.env.BD_PORT,
    database: process.env.BD_NAME,
}

const pool = mysql.createPool(options);
pool.getConnection((err, connection)=>{
    if(err) return console.error(`BD Error ${err.code}`)
    else if(connection) connection.release();
    return;
})

pool.query = promisify(pool.query);

module.exports = pool