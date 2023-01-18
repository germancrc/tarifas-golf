const express = require('express')
const router_guias = express.Router()
const multer = require('multer')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')

router_guias.use(cookieParser('alert-cookies'))
router_guias.use(
	session({
		secret: 'alert-cookies',
		cookie: { maxAge: 6000 },
		resave: true,
		saveUninitialized: true,
	})
)

router_guias.use(flash())

const authController = require('../controllers/authController')
const guiasController = require('../controllers/guiasController')

//multer
const upload = multer({
	storage: multer.memoryStorage(),
	fileFilter(req, file, cb) {
		let type = file.mimetype.startsWith('application/pdf')
		type ? cb(null, true) : cb(new Error('No es PDF'))
	},
})

//---------------------------------------GUIAS-------------------------------------------
router_guias.get('/guias', authController.isAuthenticated, guiasController.viewGuide)
router_guias.post('/uploadGuide', upload.single('archivo'), guiasController.uploadGuide)
router_guias.get('/ajustes/guias-conf', authController.isAuthenticated, guiasController.getGuides)
router_guias.get('/ajustes/guias-conf/deleteGuide/:id', authController.isAuthenticated, guiasController.deleteGuide)
router_guias.get('/downloadGuide/:id', authController.isAuthenticated, guiasController.downloadGuide)

module.exports = router_guias
