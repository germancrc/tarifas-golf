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

const authController = require('../controllers/authController')
const ratesMgController = require('../controllers/ratesMgController')

//---------------------------------------TARIFAS MINI GOLF-----------------------------------
router_tarifas_minig.post('/createRateMg', ratesMgController.createRateMg)
router_tarifas_minig.get('/ajustes/tarifas-mg', authController.isAuthenticated, ratesMgController.getRatesMg)
router_tarifas_minig.get('/ajustes/new-tarifas-mg', authController.isAuthenticated, ratesMgController.getOperaCodes)
router_tarifas_minig.get('/ajustes/edit-tarifa-mg/:id', authController.isAuthenticated, ratesMgController.getRateMg)
router_tarifas_minig.post('/ajustes/edit-tarifa-mg/:id', authController.isAuthenticated, ratesMgController.updateRateMg)
router_tarifas_minig.get('/ajustes/tarifas-mg/deleteRateMg/:id', authController.isAuthenticated, ratesMgController.deleteRateMg)

module.exports = router_tarifas_minig
