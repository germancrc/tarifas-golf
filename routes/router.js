const express = require('express')
const router = express.Router()

const db = require('../database/db')

const authController = require('../controllers/authController')
const codesController = require('../controllers/codesController')
const ratesController = require('../controllers/ratesController')
const ratesMgController = require('../controllers/ratesMgController')
const servicesController = require('../controllers/servicesController')
const ttooController = require('../controllers/ttooController')
const usuariosController = require('../controllers/usuariosController')


//router de las vistas
router.get('/', authController.isAuthenticated, (req, res) => {
   db.query('SELECT * FROM servicios ORDER BY nombre asc', (error, results) => {
      if(results){
         res.render('index', {user:req.user, results:results, alert:false})
      }else if(!user){
         res.render('login')
      }else{
         throw error;
      }
   })
})

// router.get("*", authController.isAuthenticated, (req, res) => {
//    res.render('404', {user:req.user,  alert:false})
// })

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
   db.query('SELECT * FROM opera_codes order by uso asc', (error, results) => {
      if(results){
         res.render('opera', {user:req.user, alert:false, results:results, error: false})
      }else{
         throw error;
      }
   })
})

router.get('/origos', authController.isAuthenticated, (req, res) => {
   res.render('origos', {user:req.user, alert:false})
})

router.get('/minigolf', authController.isAuthenticated, (req, res) => {
   db.query('SELECT * FROM tarifasmg', (error, results) => {
      if(results){
         res.render('minigolf', {user:req.user, results:results, alert:false})
      }else{
         throw error;
      }
   })
})

router.get('/tarifas/tarifa-hotel', authController.isAuthenticated, (req, res) => {
   db.query('SELECT * FROM tarifas where cliente IN ("hotel", "varios") ORDER BY nombre asc', (error, results) => {
      if(results){
         res.render('tarifas/tarifa-hotel', {user:req.user, results:results,  alert:false})
      }else{
         throw error;
      }
   })
})

router.get('/tarifas/tarifa-local', authController.isAuthenticated, (req, res) => {
   db.query('SELECT * FROM tarifas where cliente IN ("local", "varios") ORDER BY nombre asc', (error, results) => {
      if(results){
         res.render('tarifas/tarifa-local', {user:req.user, results:results, alert:false})
      }else{
         throw error;
      }
   })
})

router.get('/tarifas/tarifa-ttoo', authController.isAuthenticated, (req, res) => {
   db.query('SELECT * FROM ttooRates', (error, results) => {
      if(results){
         res.render('tarifas/tarifa-ttoo', {user:req.user, results:results, alert:false})
      }else{
         throw error;
      }
   })
})

router.get('/tarifas/tarifa-turista', authController.isAuthenticated, (req, res) => {
   db.query('SELECT * FROM tarifas where cliente IN ("extranjero", "varios") ORDER BY nombre asc', (error, results) => {
      if(results){
         res.render('tarifas/tarifa-turista', {user:req.user, results:results,  alert:false})
      }else{
         throw error;
      }
   })
})

router.get('/tarifas', authController.isAuthenticated, (req, res) => {
   res.render('tarifas', {user:req.user, alert:false})
})

//RUTAS AJUSTES

// VERIFICAR SI ES ADMIN O USER
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

//--------------------------------------SERVICIOS--------------------------------------------------------------

router.get('/ajustes/servicios-conf', authController.isAuthenticated, servicesController.getServices)
router.get('/ajustes/new-servicio', authController.isAuthenticated, servicesController.getOperaCodes)
router.get('/ajustes/servicios-conf/:id', authController.isAuthenticated, servicesController.getService)
router.post('/ajustes/servicios-conf/:id', authController.isAuthenticated, servicesController.updateService)
router.get('/ajustes/servicios-conf/deleteService/:id', authController.isAuthenticated, servicesController.deleteService)

//------------------------------------------------------------TARIFAS----------------------------------------------------------
// MOSTRAR LISTA DE TARIFAS
router.get('/ajustes/tarifas-conf', authController.isAuthenticated, (req, res) => {
   db.query('SELECT * FROM tarifas ORDER BY nombre asc', (error, results) => {
      if(results){
         res.render('ajustes/tarifas-conf', {user:req.user, alert:false, results:results, error: false})
      }else{
         throw error;
      }
   })
})

// MOSTRAR TARIFA A EDITAR
router.get('/ajustes/tarifas-conf/:id', authController.isAuthenticated, (req, res) => {
   const id = req.params.id;
   db.query('SELECT * FROM tarifas WHERE id=?', [id], (error, results) => {
      if(results){
         res.render('ajustes/edit-tarifa', {user:req.user, rate:results[0], alert:false})
      }else{
         throw error;
      }
   })
})

// EDITAR TARIFA
router.post('/ajustes/tarifas-conf/:id', authController.isAuthenticated, (req, res) => {
   try {
   const {id} = req.params;
   const {nombre, precio, cod_opera, cliente, tips }= req.body;
   const editedRate = {nombre, precio, cod_opera, cliente, tips};
   db.query('UPDATE tarifas SET ? WHERE id = ?', [editedRate, id]);
   res.redirect('/ajustes/tarifas-conf');
   } catch (error) {
       console.log(error);
   }

})

// ELIMINAR TARIFA
router.get('/ajustes/tarifas-conf/deleteRate/:id', authController.isAuthenticated, (req, res) => {
   try {
   const {id} = req.params;
   db.query('DELETE FROM tarifas WHERE id = ?', [id]);
   res.redirect('/ajustes/tarifas-conf');
   } catch (error) {
       console.log(error);
   }

})

//-------------------------------------------TARIFAS MINI GOLF-----------------------------------
router.get('/ajustes/tarifas-mg', authController.isAuthenticated, ratesMgController.getRatesMg)
router.get('/ajustes/new-tarifas-mg', authController.isAuthenticated, ratesMgController.getOperaCodes)
router.get('/ajustes/tarifas-mg/:id', authController.isAuthenticated, ratesMgController.getRateMg)
router.post('/ajustes/tarifas-mg/:id', authController.isAuthenticated, ratesMgController.updateRateMg)
router.get('/ajustes/tarifas-mg/deleteRateMg/:id', authController.isAuthenticated, ratesMgController.deleteRateMg)

//-------------------------------------------TOUR OPERADORES-------------------------------------------
// MOSTRAR LISTA DE TTOO
router.get('/ajustes/ttoo-conf', authController.isAuthenticated, (req, res) => {
   db.query('SELECT * FROM ttooRates', (error, results) => {
      if(results){
         res.render('ajustes/ttoo-conf', {user:req.user, alert:false, results:results, error: false})
      }else{
         throw error;
      }
   })
})

// MOSTRAR TTOO A EDITAR
router.get('/ajustes/ttoo-conf/:id', authController.isAuthenticated, (req, res) => {
   const id = req.params.id;
   db.query('SELECT * FROM ttooRates WHERE id=?', [id], (error, results) => {
      if(results){
         res.render('ajustes/edit-ttoo', {user:req.user, ttoo:results[0], alert:false})
      }else{
         throw error;
      }
   })
})

// EDITAR TTOO
router.post('/ajustes/ttoo-conf/:id', authController.isAuthenticated, (req, res) => {
   try {
   const {id} = req.params;
   const {nombre, precio, cod_opera, operacion}= req.body;
   const editedTtoo = {nombre, precio, cod_opera, operacion};
   db.query('UPDATE ttooRates SET ? WHERE id = ?', [editedTtoo, id]);
   res.redirect('/ajustes/ttoo-conf');
   } catch (error) {
       console.log(error);
   }

})

// ELIMINAR TTOO
router.get('/ajustes/ttoo-conf/deleteTtoo/:id', authController.isAuthenticated, (req, res) => {
   try {
   const {id} = req.params;
   db.query('DELETE FROM ttooRates WHERE id = ?', [id]);
   res.redirect('/ajustes/ttoo-conf');
   } catch (error) {
       console.log(error);
   }

})
//-------------------------------------------CODIGOS OPERA-------------------------------------------
router.get('/ajustes/opera-codes', authController.isAuthenticated, codesController.getCodes)
router.get('/ajustes/opera-codes/:id', authController.isAuthenticated, codesController.getCode)
router.post('/ajustes/opera-codes/:id', authController.isAuthenticated, codesController.updateCode)
router.get('/ajustes/opera-codes/deleteCode/:id', authController.isAuthenticated, codesController.deleteCode)


//-------------------------------------------USUARIOS------------------------------------------------
router.get('/ajustes/usuarios-conf', authController.isAuthenticated, usuariosController.getUsers);
router.get('/ajustes/usuarios-conf/:id', authController.isAuthenticated, usuariosController.getUser)
router.post('/ajustes/usuarios-conf/:id', authController.isAuthenticated, usuariosController.updateUser)
router.get('/ajustes/usuarios-conf/deleteUser/:id', authController.isAuthenticated, usuariosController.deleteUser)



// *************************************METODOS CONTROLLER************************************************** 

//router metodos controller login
router.post('/login', authController.login)
router.get('/logout', authController.logout)


//router metodos controller usuarios
router.post('/createUser', usuariosController.createUser)
router.get('/getUsers', usuariosController.getUsers)
router.get('/getUser', usuariosController.getUsers)
router.post('/updatetUser', usuariosController.getUsers)
router.get('/deleteUser', usuariosController.deleteUser)



//router metodos controller servicios
router.post('/createService', servicesController.createService)
router.get('/getOperaCodes', servicesController.getOperaCodes)
router.get('/getServices', servicesController.getServices)
router.get('/getService', servicesController.getService)
router.post('/updateService', servicesController.updateService)
router.get('/deleteService', servicesController.deleteService)



//router metodos controller tarifas
router.post('/createRate', ratesController.createRate)
// router.post('/updateRate/:id', ratesController.updateRate)
// router.post('/deleteRate/:id', ratesController.deleteRate)

//router metodos controller tarifas MINI GOLF
router.post('/createRateMg', ratesMgController.createRateMg)
router.get('/getOperaCodes', ratesMgController.getOperaCodes)
router.get('/getRatesMg', ratesMgController.getRatesMg)
router.get('/getRateMg', ratesMgController.getRateMg)
router.post('/updateRateMg', ratesMgController.updateRateMg)
router.get('/deleteRateMg', ratesMgController.deleteRateMg)

//router metodos controller tarifas TTOO
router.post('/createTtoo', ttooController.createTtoo)
// router.post('/updateRate/:id', ratesController.updateRate)
// router.post('/deleteRate/:id', ratesController.deleteRate)

//router metodos controller CODIGOS OPERA
router.post('/createCode', codesController.createCode)
router.get('/getCodes', codesController.getCodes)
router.get('/getCode', codesController.getCode)
router.post('/updateCode', codesController.updateCode)
router.get('/deleteCode', codesController.deleteCode)



module.exports = router
    
