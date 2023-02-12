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

const controller_auth = require('../controllers/controller_auth')
const controller_guias = require('../controllers/controller_guias')

//multer
const upload = multer({
	storage: multer.memoryStorage(),
	fileFilter(req, file, cb) {
		let type = file.mimetype.startsWith('application/pdf')
		type ? cb(null, true) : cb(new Error('No es PDF'))
	},
})

//---------------------------------------GUIAS-------------------------------------------
router_guias.get('/guias', controller_auth.isAuthenticated, controller_guias.viewGuide)
router_guias.post('/ajustes/subir_guia', upload.single('archivo'), controller_guias.uploadGuide, controller_auth.isAuthenticated)
router_guias.get('/downloadGuide/:id', controller_auth.isAuthenticated, controller_guias.downloadGuide)
router_guias.get('/ajustes/conf_guias', controller_auth.isAuthenticated, controller_guias.getGuides)
router_guias.get('/ajustes/edit_guia/:id', controller_auth.isAuthenticated, controller_guias.getGuide)
router_guias.post('/ajustes/edit_guia/:id', upload.single('archivo'), controller_auth.isAuthenticated, controller_guias.updateGuide)
router_guias.get('/ajustes/conf_guias/borrar_guia/:id', controller_auth.isAuthenticated, controller_guias.deleteGuide)

module.exports = router_guias
