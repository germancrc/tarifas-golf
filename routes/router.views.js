const express = require('express')
const router_views = express.Router()

const controller_auth = require('../controllers/controller_auth')
const controller_vistas = require('../controllers/controller_vistas')

router_views.get('/minigolf', controller_auth.verify_token, controller_auth.isAuthenticated, controller_vistas.view_minigolf)

router_views.get('/index', controller_auth.verify_token, controller_auth.isAuthenticated, controller_vistas.view_index)

module.exports = router_views
