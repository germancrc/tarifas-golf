const express = require('express')
const router_rutinas = express.Router()
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')

router_rutinas.use(cookieParser('alert-cookies'))
router_rutinas.use(
	session({
		secret: 'alert-cookies',
		cookie: { maxAge: 6000 },
		resave: true,
		saveUninitialized: true,
	})
)

router_rutinas.use(flash())

const authController = require('../controllers/authController')
const rutinas_controller = require('../controllers/rutinas_controller')

//---------------------------------------RUTINAS-------------------------------------------
router_rutinas.post('/create_tarea', authController.isAuthenticated, rutinas_controller.create_tarea)
router_rutinas.get('/rutinas', authController.isAuthenticated, rutinas_controller.view_rutinas)
router_rutinas.get('/ajustes/rutinas-conf', authController.isAuthenticated, rutinas_controller.get_tareas)
router_rutinas.get('/ajustes/edit_rutinas/:id', authController.isAuthenticated, rutinas_controller.get_tarea)
router_rutinas.post('/ajustes/edit-rutinas/:id', authController.isAuthenticated, rutinas_controller.update_tarea)
router_rutinas.get('/ajustes/rutinas-conf/delete_tarea/:id', authController.isAuthenticated, rutinas_controller.delete_tarea)

module.exports = router_rutinas
