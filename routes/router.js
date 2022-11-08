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
      if(results){
         res.render('index', {user:req.user, results:results, alert:false})
      }else{
         throw error;
      }
   })
})

router.get('/login', (req, res) => {
   res.render('login', {alert:false})
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

router.get('/tarifas/tarifa-hotel', authController.isAuthenticated, (req, res) => {
   res.render('tarifas/tarifa-hotel', {user:req.user, alert:false})
})

router.get('/tarifas/tarifa-local', authController.isAuthenticated, (req, res) => {
   res.render('tarifas/tarifa-local', {user:req.user, alert:false})
})

router.get('/tarifas/tarifa-ttoo', authController.isAuthenticated, (req, res) => {
   res.render('tarifas/tarifa-ttoo', {user:req.user, alert:false})
})

router.get('/tarifas/tarifa-turista', authController.isAuthenticated, (req, res) => {
   res.render('tarifas/tarifa-turista', {user:req.user, alert:false})
})

router.get('/tarifas', authController.isAuthenticated, (req, res) => {
   res.render('tarifas', {user:req.user, alert:false})
})

//RUTAS AJUSTES

router.get('/ajustes', authController.isAuthenticated, (req, res) => {
   db.query('SELECT * FROM servicios', (error, results) => {
      if(results && req.user.rol === "Admin"){
         res.render('ajustes', {user:req.user, results:results, alert:false})
      }else{
         res.render('index', {user:req.user,results:results, alert:false})
         // throw error;
      }
   })
})

router.get('/ajustes/servicios-conf', authController.isAuthenticated, (req, res) => {
   db.query('SELECT * FROM servicios', (error, results) => {
      if(results){
         res.render('ajustes/servicios-conf', {user:req.user, results:results, alert:false})
      }else{
         throw error;
      }
   })
})

router.get('/ajustes/servicios-conf/:id', authController.isAuthenticated, (req, res) => {
   const id = req.params.id;
    db.query('SELECT * FROM servicios WHERE id=?', [id], (error, results) => {
       if(results){
         res.render('ajustes/edit-servicio', {user:req.user, service:results[0], alert:false})
       }else{
          throw error;
       }
    })
})

router.post('/ajustes/servicios-conf/:id', authController.isAuthenticated, (req, res) => {
   try {
   const {id} = req.params;
   const {nombre, precio, descripcion }= req.body;
   const editedServ = {nombre, precio, descripcion };
   
   
      db.query('UPDATE servicios SET ? WHERE id = ?', [editedServ, id]);
      res.redirect('/ajustes/servicios-conf');
   } catch (error) {
       console.log(error);
   }

})

router.get('/ajustes/tarifas-conf', authController.isAuthenticated, (req, res) => {
   db.query('SELECT * FROM tarifas', (error, results) => {
      if(results){
         res.render('ajustes/tarifas-conf', {user:req.user, alert:false, results:results, error: false})
      }else{
         throw error;
      }
   })
})

router.get('/ajustes/usuarios-conf', authController.isAuthenticated, (req, res) => {
   db.query('SELECT * FROM usuarios', (error, results) => {
      if(results){
         res.render('ajustes/usuarios-conf', {user:req.user, alert:false, results:results, error: false})
      }else{
         throw error;
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
// router.post('/updateService/:id', servicesController.updateService)



//router metodos controller tarifas
router.post('/createRate', ratesController.createRate)



module.exports = router
    
