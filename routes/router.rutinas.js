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

const controller_auth = require('../controllers/controller_auth')
const controller_rutinas = require('../controllers/controller_rutinas')

//---------------------------------------RUTINAS-------------------------------------------
router_rutinas.post('/tarea_completa/:id', controller_auth.isAuthenticated, controller_rutinas.tarea_completa)
router_rutinas.get('/rutinas', controller_auth.isAuthenticated, controller_rutinas.view_rutinas)
router_rutinas.post('/create_tarea', controller_auth.isAuthenticated, controller_rutinas.create_tarea)
router_rutinas.get('/ajustes/conf_rutinas', controller_auth.isAuthenticated, controller_rutinas.get_tareas)
router_rutinas.get('/ajustes/edit_rutinas/:id', controller_auth.isAuthenticated, controller_rutinas.get_tarea)
router_rutinas.post('/edit_rutina/:id', controller_auth.isAuthenticated, controller_rutinas.update_tarea)
router_rutinas.get('/ajustes/conf_rutinas/delete_tarea/:id', controller_auth.isAuthenticated, controller_rutinas.delete_tarea)

module.exports = router_rutinas
