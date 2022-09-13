const pool = require('../database/connection')
const mercadopago = require('mercadopago')

mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN)
const table = process.env.BD_TABLE_COMPRAS

const Compras = {
    async save(info_pay, obj) {
        const res = await mercadopago.payment.save(obj)
        .catch(err=> console.log(err))
        
        if(!res) return;
        const { status, status_detail, id } = res.body
        const keys = Object.keys(obj).join(',');
        await pool.query(`INSERT INTO ${table} (${keys}) VALUES (?)`, Object.values(obj))
        return {status, status_detail, id}
    }
}

module.exports = {Compras}