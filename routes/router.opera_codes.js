const express = require('express')
const router_opera_codes = express.Router()
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')

router_opera_codes.use(cookieParser('alert-cookies'))
router_opera_codes.use(
	session({
		secret: 'alert-cookies',
		cookie: { maxAge: 6000 },
		resave: true,
		saveUninitialized: true,
	})
)

router_opera_codes.use(flash())

const controller_auth = require('../controllers/controller_auth')
const controller_codigos_opera = require('../controllers/controller_codigos_opera')

//---------------------------------------CODIGOS OPERA-------------------------------------------
router_opera_codes.get('/opera', controller_auth.isAuthenticated, controller_codigos_opera.view_opera)
router_opera_codes.post('/ajustes/createCode', controller_codigos_opera.createCode)
router_opera_codes.get('/ajustes/conf_codigos_opera', controller_auth.isAuthenticated, controller_codigos_opera.getCodes)
router_opera_codes.get('/ajustes/new_codigo_opera', controller_auth.isAuthenticated, controller_codigos_opera.getOperaCodes)
router_opera_codes.get('/ajustes/edit_codigo_opera/:id', controller_auth.isAuthenticated, controller_codigos_opera.getCode)
router_opera_codes.post('/ajustes/edit_codigo_opera/:id', controller_auth.isAuthenticated, controller_codigos_opera.updateCode)
router_opera_codes.get('/ajustes/conf_codigos_opera/borrar_codigo/:id', controller_auth.isAuthenticated, controller_codigos_opera.deleteCode)

module.exports = router_opera_codes
