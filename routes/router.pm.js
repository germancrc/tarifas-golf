const express = require('express')
const router_pm = express.Router()
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')

router_pm.use(cookieParser('alert-cookies'))
router_pm.use(
	session({
		secret: 'alert-cookies',
		cookie: { maxAge: 6000 },
		resave: true,
		saveUninitialized: true,
	})
)

router_pm.use(flash())

const controller_auth = require('../controllers/controller_auth')
const controller_pm = require('../controllers/controller_pm')

//---------------------------------------PM-------------------------------------------
router_pm.get('/pm', controller_auth.isAuthenticated, controller_pm.view_pm)
router_pm.post('/ajustes/crear_pm', controller_auth.isAuthenticated, controller_pm.crear_pm)
router_pm.get('/ajustes/conf_pm', controller_auth.isAuthenticated, controller_pm.get_all_pm)
router_pm.get('/ajustes/new_pm', controller_auth.isAuthenticated, controller_pm.new_pm)
router_pm.get('/ajustes/edit_pm/:id', controller_auth.isAuthenticated, controller_pm.get_pm)
router_pm.post('/ajustes/edit_pm/:id', controller_auth.isAuthenticated, controller_pm.update_pm)
router_pm.get('/ajustes/conf_pm/borrar_pm/:id', controller_auth.isAuthenticated, controller_pm.delete_pm)

module.exports = router_pm
