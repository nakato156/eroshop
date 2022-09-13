const express = require('express')
const router = express.Router();
const multer = require('multer');
const { isAuthenticated } = require('../helpers/auth')

const admin_controller = require('../controllers/admin_controller')

const upload = multer({dest: 'uploads/'});

router.get('/login', admin_controller.login)
router.post('/login', admin_controller.sigin)

router.get('/admin', isAuthenticated, admin_controller.admin)
router.post('/crear-producto', isAuthenticated, upload.single('imagen'), admin_controller.createProduct)
router.post('/search/producto', isAuthenticated, admin_controller.search)
router.put('/update-producto', isAuthenticated, upload.single('imagen'), admin_controller.update_prod)
module.exports = router