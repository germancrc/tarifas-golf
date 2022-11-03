const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')
const usuariosController = require('../controllers/usuariosController')

//router de las vistas
router.get('/', authController.isAuthenticated, (req, res) => {
   res.render('index', {user:req.user})
})

router.get('/login', (req, res) => {
   res.render('login', {alert:false})
})

router.get('/ajustes', authController.isAuthenticated, (req, res) => {
   res.render('ajustes', {user:req.user, alert:false})
})
router.get('/eba', authController.isAuthenticated, (req, res) => {
   res.render('eba', {user:req.user, alert:false})
})
router.get('/ezlinks-pos', authController.isAuthenticated, (req, res) => {
   res.render('ezlinks-pos', {user:req.user, alert:false})
})
router.get('/ezlinks', authController.isAuthenticated, (req, res) => {
   res.render('ezlinks', {user:req.user, alert:false})
})
router.get('/opera', authController.isAuthenticated, (req, res) => {
   res.render('opera', {user:req.user, alert:false})
})
router.get('/origos', authController.isAuthenticated, (req, res) => {
   res.render('origos', {user:req.user, alert:false})
})
router.get('/tarifa-hotel', authController.isAuthenticated, (req, res) => {
   res.render('tarifa-hotel', {user:req.user, alert:false})
})
router.get('/tarifa-local', authController.isAuthenticated, (req, res) => {
   res.render('tarifa-local', {user:req.user, alert:false})
})
router.get('/tarifa-ttoo', authController.isAuthenticated, (req, res) => {
   res.render('tarifa-ttoo', {user:req.user, alert:false})
})
router.get('/tarifa-turista', authController.isAuthenticated, (req, res) => {
   res.render('tarifa-turista', {user:req.user, alert:false})
})
router.get('/tarifas', authController.isAuthenticated, (req, res) => {
   res.render('tarifas', {user:req.user, alert:false})
})

//router metodos controller usuarios
router.post('/agregarUsuario', usuariosController.agregarUsuario)


//router metodos controller login
router.post('/login', authController.login)
router.get('/logout', authController.logout)



module.exports = router
    