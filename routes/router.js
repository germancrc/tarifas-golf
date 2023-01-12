const express = require('express')
const router = express.Router()
const multer = require('multer')
const db = require('../database/db')

const authController = require('../controllers/authController')
const codesController = require('../controllers/codesController')
const guiasController = require('../controllers/guiasController')
const ratesController = require('../controllers/ratesController')
const ratesMgController = require('../controllers/ratesMgController')
const servicesController = require('../controllers/servicesController')
const ttooController = require('../controllers/ttooController')
const usuariosController = require('../controllers/usuariosController')
const viewsController = require('../controllers/viewsController')

//multer
const upload = multer({
	storage: multer.memoryStorage(),
	fileFilter(req, file, cb) {
		let type = file.mimetype.startsWith('application/pdf')
		type ? cb(null, true) : cb(new Error('No es PDF'))
	},
})

//***************************************************************RUTAS VARIAS********************************/
//login - LOGOUT
router.get('/', (req, res) => {
	res.render('login', { alert: false })
})
router.post('/login', authController.login)
router.get('/logout', authController.logout)

router.get('/guias', authController.isAuthenticated, guiasController.viewGuide)
router.get('/minigolf', authController.isAuthenticated, viewsController.view_minigolf)
router.get('/opera', authController.isAuthenticated, viewsController.view_opera)
router.get('/index', authController.isAuthenticated, viewsController.view_index)

//***************************************************************RUTAS AJUSTES****************************/
// VERIFICAR SI ES ADMIN O USER
router.get('/ajustes', authController.isAuthenticated, authController.checkAdmin, (req, res) => {})

//--------------------------------------SERVICIOS--------------------------------------------------------------
router.post('/createService', servicesController.createService)
router.get('/ajustes/servicios-conf', authController.isAuthenticated, servicesController.getServices)
router.get('/ajustes/new-servicio', authController.isAuthenticated, servicesController.getOperaCodes)
router.get('/ajustes/servicios-conf/:id', authController.isAuthenticated, servicesController.getService)
router.post('/ajustes/servicios-conf/:id', authController.isAuthenticated, servicesController.updateService)
router.get('/ajustes/servicios-conf/deleteService/:id', authController.isAuthenticated, servicesController.deleteService)

//--------------------------------------TARIFAS----------------------------------------------------------
router.get('/tarifas', authController.isAuthenticated, ratesController.viewRatesCg)
router.get('/tarifas/tarifa-turista', authController.isAuthenticated, ratesController.viewRatesTurista)
router.get('/tarifas/tarifa-ttoo', authController.isAuthenticated, ratesController.viewRatesTtoo)
router.get('/tarifas/tarifa-local', authController.isAuthenticated, ratesController.viewRatesLocal)
router.get('/tarifas/tarifa-hotel', authController.isAuthenticated, ratesController.viewRatesHotel)

router.post('/createRate', ratesController.createRate)
router.get('/ajustes/tarifas-conf', authController.isAuthenticated, ratesController.getRatesCg)
router.get('/ajustes/new-tarifas-cg', authController.isAuthenticated, ratesController.getOperaCodes)
router.get('/ajustes/tarifas-conf/:id', authController.isAuthenticated, ratesController.getRateCg)
router.post('/ajustes/tarifas-conf/:id', authController.isAuthenticated, ratesController.updateRateCg)
router.get('/ajustes/tarifas-conf/deleteRate/:id', authController.isAuthenticated, ratesController.deleteRateCg)

//---------------------------------------TARIFAS MINI GOLF-----------------------------------
router.post('/createRateMg', ratesMgController.createRateMg)
router.get('/ajustes/tarifas-mg', authController.isAuthenticated, ratesMgController.getRatesMg)
router.get('/ajustes/new-tarifas-mg', authController.isAuthenticated, ratesMgController.getOperaCodes)
router.get('/ajustes/edit-tarifa-mg/:id', authController.isAuthenticated, ratesMgController.getRateMg)
router.post('/ajustes/edit-tarifa-mg/:id', authController.isAuthenticated, ratesMgController.updateRateMg)
router.get('/ajustes/tarifas-mg/deleteRateMg/:id', authController.isAuthenticated, ratesMgController.deleteRateMg)

//---------------------------------------TOUR OPERADORES-------------------------------------------
router.post('/createTtoo', ttooController.createTtoo)
router.get('/ajustes/ttoo-conf', authController.isAuthenticated, ttooController.getTtoos)
router.get('/ajustes/new-ttoo', authController.isAuthenticated, ttooController.getOperaCodes)
router.get('/ajustes/ttoo-conf/:id', authController.isAuthenticated, ttooController.getTtoo)
router.post('/ajustes/ttoo-conf/:id', authController.isAuthenticated, ttooController.updateTtoo)
router.get('/ajustes/ttoo-conf/deleteTtoo/:id', authController.isAuthenticated, ttooController.deleteTtoo)

//---------------------------------------CODIGOS OPERA-------------------------------------------
router.post('/createCode', codesController.createCode)
router.get('/ajustes/opera-codes', authController.isAuthenticated, codesController.getCodes)
router.get('/ajustes/new-opera-codes', authController.isAuthenticated, codesController.getOperaCodes)
router.get('/ajustes/opera-codes/:id', authController.isAuthenticated, codesController.getCode)
router.post('/ajustes/opera-codes/:id', authController.isAuthenticated, codesController.updateCode)
router.get('/ajustes/opera-codes/deleteCode/:id', authController.isAuthenticated, codesController.deleteCode)

//---------------------------------------GUIAS-------------------------------------------
router.post('/uploadGuide', upload.single('archivo'), guiasController.uploadGuide)
router.get('/ajustes/guias-conf', authController.isAuthenticated, guiasController.getGuides)
router.get('/ajustes/guias-conf/deleteGuide/:id', authController.isAuthenticated, guiasController.deleteGuide)
router.get('/downloadGuide/:id', authController.isAuthenticated, guiasController.downloadGuide)

//---------------------------------------USUARIOS------------------------------------------------
router.post('/createUser', usuariosController.createUser)
router.get('/edit-usuario-actual', authController.isAuthenticated, viewsController.view_edit_current_user)
router.post('/edit-usuario-actual/:id', authController.isAuthenticated, viewsController.update_current_user)
router.get('/ajustes/usuarios-conf', authController.isAuthenticated, usuariosController.getUsers)
router.get('/ajustes/new-usuario', authController.isAuthenticated, usuariosController.newUser)
router.get('/ajustes/edit-usuario/:id', authController.isAuthenticated, usuariosController.getUser)
router.post('/ajustes/edit-usuario/:id', authController.isAuthenticated, usuariosController.updateUser)
router.get('/ajustes/usuarios-conf/deleteUser/:id', authController.isAuthenticated, usuariosController.deleteUser)

// *************************************FIN RUTAS AJUSTES************************************************

// *************************************METODOS CONTROLLER************************************************

// //router metodos controller tarifas
// router.post('/createRate', ratesController.createRate)
// router.post('/updateRate/:id', ratesController.updateRateCg)
// router.post('/deleteRate/:id', ratesController.deleteRateCg)

// //router metodos controller tarifas MINI GOLF
// router.post('/createRateMg', ratesMgController.createRateMg)
// router.get('/getOperaCodes', ratesMgController.getOperaCodes)
// router.get('/getRatesMg', ratesMgController.getRatesMg)
// router.get('/getRateMg', ratesMgController.getRateMg)
// router.post('/updateRateMg', ratesMgController.updateRateMg)
// router.get('/deleteRateMg', ratesMgController.deleteRateMg)

// //router metodos controller CODIGOS OPERA
// router.post('/createCode', codesController.createCode)
// router.get('/getCodes', codesController.getCodes)
// router.get('/getCode', codesController.getCode)
// router.post('/updateCode', codesController.updateCode)
// router.get('/deleteCode', codesController.deleteCode)

// //router metodos controller usuarios
// router.post('/createUser', usuariosController.createUser)
// router.get('/getUsers', usuariosController.getUsers)
// router.get('/getUser', usuariosController.getUser)
// router.post('/updateUser', usuariosController.updateUser)
// router.get('/deleteUser', usuariosController.deleteUser)

//router metodos controller tarifas TTOO
// router.post('/createTtoo', ttooController.createTtoo)
// router.post('/updateRate/:id', ratesController.updateRate)
// router.post('/deleteRate/:id', ratesController.deleteRate)

//router metodos controller Guias
// router.post('/uploadGuide', upload.single('archivo'), guiasController.uploadGuide)
// router.get('/getGuides', guiasController.getGuides)
// router.get('/deleteGuide', guiasController.deleteGuide)
// router.get('/downloadGuide', guiasController.downloadGuide)

module.exports = router
