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

//--------------------------------------SERVICIOS-------------------------------------------------------------------------------------
// MOSTRAR LISTA SERVICIOS
router.get('/ajustes/servicios-conf', authController.isAuthenticated, (req, res) => {
   db.query('SELECT * FROM servicios', (error, results) => {
      if(results){
         res.render('ajustes/servicios-conf', {user:req.user, results:results, alert:false})
      }else{
         throw error;
      }
   })
})

// MOSTRAR SERVICIO A EDITAR
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

// EDITAR SERVICIO
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

// ELIMINAR SERVICIO
router.get('/ajustes/servicios-conf/deleteService/:id', authController.isAuthenticated, (req, res) => {
   try {
   const {id} = req.params;
   db.query('DELETE FROM servicios WHERE id = ?', [id]);
   res.redirect('/ajustes/servicios-conf');
   } catch (error) {
       console.log(error);
   }

})

//------------------------------------------------------------TARIFAS----------------------------------------------------------
// MOSTRAR LISTA DE TARIFAS
router.get('/ajustes/tarifas-conf', authController.isAuthenticated, (req, res) => {
   db.query('SELECT * FROM tarifas', (error, results) => {
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
   const {nombre, precio }= req.body;
   const editedRate = {nombre, precio};
   db.query('UPDATE tarifas SET ? WHERE id = ?', [editedRate, id]);
   res.redirect('/ajustes/tarifas-conf');
   } catch (error) {
       console.log(error);
   }

})

// ELIMINAR TARIFA
router.get('/ajustes/servicios-conf/deleteService/:id', authController.isAuthenticated, (req, res) => {
   try {
   const {id} = req.params;
   db.query('DELETE FROM servicios WHERE id = ?', [id]);
   res.redirect('/ajustes/servicios-conf');
   } catch (error) {
       console.log(error);
   }

})

//----------------------------------------------------------USUARIOS------------------------------------------------------------------
// MOSTRAR LISTA DE USUARIOS
router.get('/ajustes/usuarios-conf', authController.isAuthenticated, (req, res) => {
   db.query('SELECT * FROM usuarios', (error, results) => {
      if(results){
         res.render('ajustes/usuarios-conf', {user:req.user, alert:false, results:results, error: false})
      }else{
         throw error;
      }
   })
})

// MOSTRAR USUARIO A EDITAR
router.get('/ajustes/usuarios-conf/:id', authController.isAuthenticated, (req, res) => {
   const id = req.params.id;
   db.query('SELECT * FROM usuarios WHERE id=?', [id], (error, results) => {
      if(results){
         res.render('ajustes/edit-usuario', {user:req.user, user:results[0], alert:false})
      }else{
         throw error;
      }
   })
})

// EDITAR USUARIO
// router.post('/ajustes/usuarios-conf/:id', authController.isAuthenticated, (req, res) => {
//    try {
//    const {id} = req.params;
//    const {nombre, precio }= req.body;
//    const editedUser = {nombre, precio};
//    db.query('UPDATE usuarios SET ? WHERE id = ?', [editedUser, id]);
//    res.redirect('/ajustes/usuarios-conf');
//    } catch (error) {
//        console.log(error);
//    }

// })

// ELIMINAR USUARIO
router.get('/ajustes/usuarios-conf/deleteUser/:id', authController.isAuthenticated, (req, res) => {
   try {
   const {id} = req.params;
   db.query('DELETE FROM usuarios WHERE id = ?', [id]);
   res.redirect('/ajustes/usuarios-conf');
   } catch (error) {
       console.log(error);
   }

})




// *********************************************************METODOS CONTROLLER********************************************************* 

//router metodos controller login
router.post('/login', authController.login)
router.get('/logout', authController.logout)


//router metodos controller usuarios
router.post('/createUser', usuariosController.createUser)
//router.post('/updateUser', usuariosController.createUser)



//router metodos controller servicios
router.post('/createService', servicesController.createService)
// router.put('/updateService/:id', servicesController.updateService)
// router.delete('/deleteService/:id', servicesController.deleteService)



//router metodos controller tarifas
router.post('/createRate', ratesController.createRate)
// router.post('/updateRate/:id', ratesController.updateRate)
// router.post('/deleteRate/:id', ratesController.deleteRate)



module.exports = router
    
