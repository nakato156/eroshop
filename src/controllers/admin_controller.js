const admin_controller = {};
const passport = require('passport')

const { Product } = require('../models/Product')

admin_controller.admin = (req, res) => res.render('admin')
admin_controller.login = (req, res) => res.render('login_admin')

admin_controller.sigin = passport.authenticate('local', {
    failureRedirect: '/panel/login',
    successRedirect: '/panel/admin'
})

admin_controller.createProduct = async (req, res) => {
    const file = req.file
    const { nombre, categoria, precio, descripcion } = req.body
    const data = await Product.save({nombre, categoria, precio, descripcion})
    console.log(data)
    if(data) return res.send({token: process.env.TOKEN_HOSTIMG, id: data})
    return res.send({error: 'Ha ocurrido un error'})
}

admin_controller.search = async (req, res) => {
    let {query, criterio} = req.body
    if(criterio) {
        let find = {}
        find[criterio] = criterio != 'uuid' ? `%${query}%` : query;
        const resultado = await Product.findBy(find)
        return res.send(resultado)
    }
    res.status(400);
    return res.send({"error": "nose ha especificado un criterio"})
}

admin_controller.update_prod = async (req, res) => {
    const resultado = await Product.updete(req.body)
    if(resultado.affectedRows == 1) return res.send({status: true});
    return res.send({error: "Error al actualizar"});
}

module.exports = admin_controller