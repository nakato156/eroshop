const express = require('express')
const router = express.Router()

const controller = require('../controllers/controller')

router.get('/', controller.index);
router.get('/producto/:id', controller.info_producto);
router.get('/carrito', controller.carrito)
router.post('/payment', controller.procesar_pago)

module.exports = router;