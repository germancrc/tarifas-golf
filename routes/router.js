const express = require('express')
const router = express.Router()

const db = require('../database/db')

const authController = require('../controllers/authController')
const usuariosController = require('../controllers/usuariosController')
const ratesController = require('../controllers/ratesController')
const servicesController = require('../controllers/servicesController')


//router de las vistas
router.get('/', authController.isAuthenticated, (req, res) => {
   db.query('SELECT * FROM servicios', (error, results) => {
      if(error){
         throw error;
      }else{
         res.render('index', {user:req.user, results:results, alert:false})
      }
   })
})

router.get('/login', (req, res) => {
   res.render('login', {alert:false})
})

router.get('/ajustes', authController.isAuthenticated, (req, res) => {
   if(req.user.rol === "Admin"){
      res.render('ajustes', {user:req.user, alert:false})
   }else{
      res.render('index')
   }
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

router.get('/servicios-conf', authController.isAuthenticated, (req, res) => {
   db.query('SELECT * FROM servicios', (error, results) => {
      if(error){
         throw error;
      }else{
         res.render('servicios-conf', {user:req.user, results:results, alert:false})
      }
   })
})

router.get('/tarifas-conf', authController.isAuthenticated, (req, res) => {
   db.query('SELECT * FROM tarifas', (error, results) => {
      if(error){
         throw error;
      }else{
         res.render('tarifas-conf', {user:req.user, alert:false, results:results, error: false})
      }
   })
})

router.get('/usuarios-conf', authController.isAuthenticated, (req, res) => {
   db.query('SELECT * FROM usuarios', (error, results) => {
      if(error){
         throw error;
      }else{
         res.render('usuarios-conf', {user:req.user, alert:false, results:results, error: false})
      }
   })
})

//router metodos controller login
router.post('/login', authController.login)
router.get('/logout', authController.logout)


//router metodos controller usuarios
router.post('/createUser', usuariosController.createUser)
//router.post('/updateUser', usuariosController.createUser)



//router metodos controller servicios
router.post('/createService', servicesController.createService)
router.post('/updateService', servicesController.updateService)



//router metodos controller tarifas
router.post('/createRate', ratesController.createRate)



module.exports = router
    
