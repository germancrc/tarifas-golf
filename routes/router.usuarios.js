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

const controller_auth = require('../controllers/controller_auth')
const controller_usuarios = require('../controllers/controller_usuarios')

//---------------------------------------USUARIOS------------------------------------------------
router_usuarios.post('/createUser', controller_usuarios.createUser, controller_auth.checkAdmin)
router_usuarios.get('/edit-usuario-actual', controller_auth.isAuthenticated, controller_usuarios.view_edit_current_user, controller_auth.checkAdmin)
router_usuarios.post('/edit-usuario-actual/:id', controller_auth.isAuthenticated, controller_usuarios.update_current_user, controller_auth.checkAdmin)
router_usuarios.get('/ajustes/conf_usuarios', controller_auth.isAuthenticated, controller_usuarios.getUsers, controller_auth.checkAdmin)
router_usuarios.get('/ajustes/new_usuario', controller_auth.isAuthenticated, controller_usuarios.newUser, controller_auth.checkAdmin)
router_usuarios.get('/ajustes/edit-usuario/:id', controller_auth.isAuthenticated, controller_usuarios.getUser, controller_auth.checkAdmin)
router_usuarios.post('/ajustes/edit-usuario/:id', controller_auth.isAuthenticated, controller_usuarios.updateUser, controller_auth.checkAdmin)
router_usuarios.get(
	'/ajustes/usuarios-conf/deleteUser/:id',
	controller_auth.isAuthenticated,
	controller_usuarios.deleteUser,
	controller_auth.checkAdmin
)

module.exports = router_usuarios
