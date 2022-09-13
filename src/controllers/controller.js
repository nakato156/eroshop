const controller = {};
const { Product } = require('../models/Product')

controller.index = async (req, res)=>{
    const productos = await Product.getAll()
    res.render('index', {
        productos
    });
}

controller.info_producto = async (req, res) => {
    let producto = await Product.findBy({'uuid': req.params.id});
    if(producto.length){
        producto = producto[0]
        producto.descripcion = producto.descripcion.split('\n')
        console.log(producto.descripcion.length)
        return res.render('producto', {
            producto
        })
    }
    res.status(404)
    return res.json({status: 404})
}

controller.carrito = (req, res) => {
    return res.render('carrito', {
        PUBLIC_KEY: process.env.PUBLIC_KEY
    });
}

controller.procesar_pago = async (req, res) => {

}

module.exports = controller;