const express = require('express')
const router_servicios = express.Router()
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')

router_servicios.use(cookieParser('alert-cookies'))
router_servicios.use(
	session({
		secret: 'alert-cookies',
		cookie: { maxAge: 6000 },
		resave: true,
		saveUninitialized: true,
	})
)

router_servicios.use(flash())

const controller_auth = require('../controllers/controller_auth')
const controller_servicios = require('../controllers/controller_servicios')

//-----------------------SERVICIOS------------------------------------------------
router_servicios.post('/ajustes/crear_servicio', controller_auth.isAuthenticated, controller_servicios.createService)
router_servicios.get('/ajustes/conf_servicios', controller_auth.isAuthenticated, controller_servicios.getServices)
router_servicios.get('/ajustes/new_servicio', controller_auth.isAuthenticated, controller_servicios.getOperaCodes)
router_servicios.get('/ajustes/edit_servicio/:id', controller_auth.isAuthenticated, controller_servicios.getService)
router_servicios.post('/ajustes/edit_servicio/:id', controller_auth.isAuthenticated, controller_servicios.updateService)
router_servicios.get('/ajustes/conf_servicios/borrar_servicio/:id', controller_auth.isAuthenticated, controller_servicios.deleteService)

module.exports = router_servicios
