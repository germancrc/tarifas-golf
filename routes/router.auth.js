const express = require('express')
const router_auth = express.Router()
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')

router_auth.use(cookieParser('alert-cookies'))
router_auth.use(
	session({
		secret: 'alert-cookies',
		cookie: { maxAge: 6000 },
		resave: true,
		saveUninitialized: true,
	})
)

router_auth.use(flash())

const authController = require('../controllers/authController')

//login - LOGOUT
router_auth.get('/', (req, res) => {
	res.render('login', { alert: false, message: req.flash('message') })
})
router_auth.post('/login', authController.login)
router_auth.get('/logout', authController.logout)

//***************************************************************RUTAS AJUSTES****************************/
// VERIFICAR SI ES ADMIN O USER
router_auth.get('/ajustes', authController.isAuthenticated, authController.checkAdmin, (req, res) => {})

module.exports = router_auth
