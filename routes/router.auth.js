const express = require('express')
const router_auth = express.Router()

const authController = require('../controllers/authController')

//login - LOGOUT
router_auth.get('/', (req, res) => {
	res.render('login', { alert: false })
})
router_auth.post('/login', authController.login)
router_auth.get('/logout', authController.logout)

//***************************************************************RUTAS AJUSTES****************************/
// VERIFICAR SI ES ADMIN O USER
router_auth.get('/ajustes', authController.isAuthenticated, authController.checkAdmin, (req, res) => {})

module.exports = router_auth
