const connection = require('../database/connection')

const Admin = {
    
    async Auth(username, password){
        return await connection.query(`SELECT * FROM admins WHERE username = ? AND password = ?`, [username, password])
    },

    async findById(id){
        return await connection.query('SELECT * FROM admins WHERE uuid = ?', [id])
    }
}

module.exports = {Admin}