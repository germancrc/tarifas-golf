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

const authController = require('../controllers/authController')
const servicesController = require('../controllers/servicesController')

//-----------------------SERVICIOS------------------------------------------------
router_servicios.post('/createService', servicesController.createService)
router_servicios.get('/ajustes/servicios-conf', authController.isAuthenticated, servicesController.getServices)
router_servicios.get('/ajustes/new-servicio', authController.isAuthenticated, servicesController.getOperaCodes)
router_servicios.get('/ajustes/edit-servicio/:id', authController.isAuthenticated, servicesController.getService)
router_servicios.post('/ajustes/edit-servicio/:id', authController.isAuthenticated, servicesController.updateService)
router_servicios.get('/ajustes/servicios-conf/deleteService/:id', authController.isAuthenticated, servicesController.deleteService)

module.exports = router_servicios
