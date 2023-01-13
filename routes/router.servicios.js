const express = require('express')
const router_servicios = express.Router()

const authController = require('../controllers/authController')
const servicesController = require('../controllers/servicesController')

//-----------------------SERVICIOS------------------------------------------------
router_servicios.post('/createService', servicesController.createService)
router_servicios.get('/ajustes/servicios-conf', authController.isAuthenticated, servicesController.getServices)
router_servicios.get('/ajustes/new-servicio', authController.isAuthenticated, servicesController.getOperaCodes)
router_servicios.get('/ajustes/servicios-conf/:id', authController.isAuthenticated, servicesController.getService)
router_servicios.post('/ajustes/servicios-conf/:id', authController.isAuthenticated, servicesController.updateService)
router_servicios.get('/ajustes/servicios-conf/deleteService/:id', authController.isAuthenticated, servicesController.deleteService)

module.exports = router_servicios
