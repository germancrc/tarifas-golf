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

const authController = require('../controllers/authController')
const ratesController = require('../controllers/ratesController')

//--------------------------------------TARIFAS----------------------------------------------------------
router_tarifas.get('/tarifas', authController.isAuthenticated, ratesController.viewRatesCg)
router_tarifas.get('/tarifas/tarifa-turista', authController.isAuthenticated, ratesController.viewRatesTurista)
router_tarifas.get('/tarifas/tarifa-ttoo', authController.isAuthenticated, ratesController.viewRatesTtoo)
router_tarifas.get('/tarifas/tarifa-local', authController.isAuthenticated, ratesController.viewRatesLocal)
router_tarifas.get('/tarifas/tarifa-hotel', authController.isAuthenticated, ratesController.viewRatesHotel)

router_tarifas.post('/createRate', ratesController.createRate)
router_tarifas.get('/ajustes/tarifas-conf', authController.isAuthenticated, ratesController.getRatesCg)
router_tarifas.get('/ajustes/new-tarifas-cg', authController.isAuthenticated, ratesController.getOperaCodes)
router_tarifas.get('/ajustes/edit-tarifa/:id', authController.isAuthenticated, ratesController.getRateCg)
router_tarifas.post('/ajustes/edit-tarifa/:id', authController.isAuthenticated, ratesController.updateRateCg)
router_tarifas.get('/ajustes/tarifas-conf/deleteRate/:id', authController.isAuthenticated, ratesController.deleteRateCg)

module.exports = router_tarifas
