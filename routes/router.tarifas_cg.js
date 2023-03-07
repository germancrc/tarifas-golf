const express = require('express')
const router_tarifas = express.Router()
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')

router_tarifas.use(cookieParser('alert-cookies'))
router_tarifas.use(
	session({
		secret: 'alert-cookies',
		cookie: { maxAge: 6000 },
		resave: true,
		saveUninitialized: true,
	})
)

router_tarifas.use(flash())

const controller_auth = require('../controllers/controller_auth')
const controller_tarifas_cg = require('../controllers/controller_tarifas_cg')

//--------------------------------------TARIFAS----------------------------------------------------------
router_tarifas.get('/tarifas', controller_auth.verify_token, controller_auth.isAuthenticated, controller_tarifas_cg.viewRatesCg)
router_tarifas.get('/tarifas/tarifa-turista', controller_auth.verify_token, controller_auth.isAuthenticated, controller_tarifas_cg.viewRatesTurista)
router_tarifas.get('/tarifas/tarifa-ttoo', controller_auth.verify_token, controller_auth.isAuthenticated, controller_tarifas_cg.viewRatesTtoo)
router_tarifas.get('/tarifas/tarifa-local', controller_auth.verify_token, controller_auth.isAuthenticated, controller_tarifas_cg.viewRatesLocal)
router_tarifas.get('/tarifas/tarifa-hotel', controller_auth.verify_token, controller_auth.isAuthenticated, controller_tarifas_cg.viewRatesHotel)

router_tarifas.post('/ajustes/crear_tarifa_cg', controller_auth.verify_token, controller_auth.isAuthenticated, controller_tarifas_cg.createRate)
router_tarifas.get('/ajustes/conf_tarifas_cg', controller_auth.verify_token, controller_auth.isAuthenticated, controller_tarifas_cg.getRatesCg)
router_tarifas.get('/ajustes/new_tarifa_cg', controller_auth.verify_token, controller_auth.isAuthenticated, controller_tarifas_cg.getOperaCodes)
router_tarifas.get('/ajustes/edit_tarifa_cg/:id', controller_auth.verify_token, controller_auth.isAuthenticated, controller_tarifas_cg.getRateCg)
router_tarifas.post('/ajustes/edit_tarifa_cg/:id', controller_auth.verify_token, controller_auth.isAuthenticated, controller_tarifas_cg.updateRateCg)
router_tarifas.get(
	'/ajustes/conf_tarifas_cg/borrar_tarifa_cg/:id',
	controller_auth.verify_token,
	controller_auth.isAuthenticated,
	controller_tarifas_cg.deleteRateCg
)

module.exports = router_tarifas
