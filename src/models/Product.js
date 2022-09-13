const pool = require('../database/connection')
const { v4: uuidv4 } = require('uuid');

function ObjectToParamsInsert(obj){
    let values = Object.keys(obj).join(',')
    let params = Object.values(obj).map(v=>'?').join(',')
    return {values, params}
}

const Product = {

    async save(obj){
        obj["uuid"] = uuidv4();
        const vals = Object.values(obj)
        const {values, params} = ObjectToParamsInsert(obj)
        let query = `INSERT INTO productos (${values}) VALUES(${params})`
        const res = await pool.query(query, vals)
        if(res.affectedRows) return obj["uuid"];
    },

    async getAll(){
        return await pool.query('SELECT * FROM productos')
    },

    async findBy(obj){
        let sentence = Object.keys(obj).map(criterio=> obj[criterio][0] == "%" ? `${criterio} like ?` : `${criterio} = ?`).join(',')
        return await pool.query(`SELECT * FROM productos WHERE ${sentence}`, Object.values(obj))
    },
    
    async updete(obj){
        return await pool.query(`UPDATE productos SET ? WHERE uuid = ?`, [obj, obj.uuid])
    },
}

module.exports = {Product}
