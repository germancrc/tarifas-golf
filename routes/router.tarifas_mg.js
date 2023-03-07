const express = require('express')
const router_tarifas_minig = express.Router()
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')

router_tarifas_minig.use(cookieParser('alert-cookies'))
router_tarifas_minig.use(
	session({
		secret: 'alert-cookies',
		cookie: { maxAge: 6000 },
		resave: true,
		saveUninitialized: true,
	})
)

router_tarifas_minig.use(flash())

const controller_auth = require('../controllers/controller_auth')
const controller_tarifas_mg = require('../controllers/controller_tarifas_mg')

//---------------------------------------TARIFAS MINI GOLF-----------------------------------
router_tarifas_minig.post('/createRateMg', controller_auth.verify_token, controller_auth.isAuthenticated, controller_tarifas_mg.createRateMg)
router_tarifas_minig.get('/ajustes/conf_tarifas_mg', controller_auth.verify_token, controller_auth.isAuthenticated, controller_tarifas_mg.getRatesMg)
router_tarifas_minig.get('/ajustes/new_tarifa_mg', controller_auth.verify_token, controller_auth.isAuthenticated, controller_tarifas_mg.getOperaCodes)
router_tarifas_minig.get(
	'/ajustes/edit_tarifa_mg/:id',
	controller_auth.verify_token,
	controller_auth.isAuthenticated,
	controller_tarifas_mg.getRateMg
)
router_tarifas_minig.post(
	'/ajustes/edit_tarifa_mg/:id',
	controller_auth.verify_token,
	controller_auth.isAuthenticated,
	controller_tarifas_mg.updateRateMg
)
router_tarifas_minig.get(
	'/ajustes/conf_tarifas_mg/borrar_tarifa_mg/:id',
	controller_auth.verify_token,
	controller_auth.isAuthenticated,
	controller_tarifas_mg.deleteRateMg
)

module.exports = router_tarifas_minig
