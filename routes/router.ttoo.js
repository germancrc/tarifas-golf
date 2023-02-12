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

const controller_auth = require('../controllers/controller_auth')
const controller_ttoo = require('../controllers/controller_ttoo')

//---------------------------------------TOUR OPERADORES-------------------------------------------
router_ttoo.post('/createTtoo', controller_auth.isAuthenticated, controller_ttoo.createTtoo)
router_ttoo.get('/ajustes/conf_ttoo', controller_auth.isAuthenticated, controller_ttoo.getTtoos)
router_ttoo.get('/ajustes/new_ttoo', controller_auth.isAuthenticated, controller_ttoo.getOperaCodes)
router_ttoo.get('/ajustes/edit_ttoo/:id', controller_auth.isAuthenticated, controller_ttoo.getTtoo)
router_ttoo.post('/ajustes/edit_ttoo/:id', controller_auth.isAuthenticated, controller_ttoo.updateTtoo)
router_ttoo.get('/ajustes/conf_ttoo/borrar_ttoo/:id', controller_auth.isAuthenticated, controller_ttoo.deleteTtoo)

module.exports = router_ttoo
