const express = require('express')
const router_views = express.Router()

const authController = require('../controllers/authController')
const viewsController = require('../controllers/viewsController')

router_views.get('/minigolf', authController.isAuthenticated, viewsController.view_minigolf)
router_views.get('/opera', authController.isAuthenticated, viewsController.view_opera)
router_views.get('/index', authController.isAuthenticated, viewsController.view_index)

module.exports = router_views
