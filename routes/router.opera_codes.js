const express = require('express')
const router_opera_codes = express.Router()

const authController = require('../controllers/authController')
const codesController = require('../controllers/codesController')

//---------------------------------------CODIGOS OPERA-------------------------------------------
router_opera_codes.post('/createCode', codesController.createCode)
router_opera_codes.get('/ajustes/opera-codes', authController.isAuthenticated, codesController.getCodes)
router_opera_codes.get('/ajustes/new-opera-codes', authController.isAuthenticated, codesController.getOperaCodes)
router_opera_codes.get('/ajustes/opera-codes/:id', authController.isAuthenticated, codesController.getCode)
router_opera_codes.post('/ajustes/opera-codes/:id', authController.isAuthenticated, codesController.updateCode)
router_opera_codes.get('/ajustes/opera-codes/deleteCode/:id', authController.isAuthenticated, codesController.deleteCode)

module.exports = router_opera_codes
