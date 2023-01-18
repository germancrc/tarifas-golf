const express = require('express')
const router_ttoo = express.Router()
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')

router_ttoo.use(cookieParser('alert-cookies'))
router_ttoo.use(
	session({
		secret: 'alert-cookies',
		cookie: { maxAge: 6000 },
		resave: true,
		saveUninitialized: true,
	})
)

router_ttoo.use(flash())

const authController = require('../controllers/authController')
const ttooController = require('../controllers/ttooController')

//---------------------------------------TOUR OPERADORES-------------------------------------------
router_ttoo.post('/createTtoo', ttooController.createTtoo)
router_ttoo.get('/ajustes/ttoo-conf', authController.isAuthenticated, ttooController.getTtoos)
router_ttoo.get('/ajustes/new-ttoo', authController.isAuthenticated, ttooController.getOperaCodes)
router_ttoo.get('/ajustes/edit-ttoo/:id', authController.isAuthenticated, ttooController.getTtoo)
router_ttoo.post('/ajustes/edit-ttoo/:id', authController.isAuthenticated, ttooController.updateTtoo)
router_ttoo.get('/ajustes/ttoo-conf/deleteTtoo/:id', authController.isAuthenticated, ttooController.deleteTtoo)

module.exports = router_ttoo
