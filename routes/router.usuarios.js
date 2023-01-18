const express = require('express')
const router_usuarios = express.Router()
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')

router_usuarios.use(cookieParser('alert-cookies'))
router_usuarios.use(
	session({
		secret: 'alert-cookies',
		cookie: { maxAge: 6000 },
		resave: true,
		saveUninitialized: true,
	})
)

router_usuarios.use(flash())

const authController = require('../controllers/authController')
const usuariosController = require('../controllers/usuariosController')

//---------------------------------------USUARIOS------------------------------------------------
router_usuarios.post('/createUser', usuariosController.createUser, authController.checkAdmin)
router_usuarios.get('/edit-usuario-actual', authController.isAuthenticated, usuariosController.view_edit_current_user, authController.checkAdmin)
router_usuarios.post('/edit-usuario-actual/:id', authController.isAuthenticated, usuariosController.update_current_user, authController.checkAdmin)
router_usuarios.get('/ajustes/usuarios-conf', authController.isAuthenticated, usuariosController.getUsers, authController.checkAdmin)
router_usuarios.get('/ajustes/new-usuario', authController.isAuthenticated, usuariosController.newUser, authController.checkAdmin)
router_usuarios.get('/ajustes/edit-usuario/:id', authController.isAuthenticated, usuariosController.getUser, authController.checkAdmin)
router_usuarios.post('/ajustes/edit-usuario/:id', authController.isAuthenticated, usuariosController.updateUser, authController.checkAdmin)
router_usuarios.get('/ajustes/usuarios-conf/deleteUser/:id', authController.isAuthenticated, usuariosController.deleteUser, authController.checkAdmin)

module.exports = router_usuarios
