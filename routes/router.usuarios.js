const express = require('express')
const router_usuarios = express.Router()

const authController = require('../controllers/authController')
const usuariosController = require('../controllers/usuariosController')

//---------------------------------------USUARIOS------------------------------------------------
router_usuarios.post('/createUser', usuariosController.createUser)
router_usuarios.get('/edit-usuario-actual', authController.isAuthenticated, usuariosController.view_edit_current_user)
router_usuarios.post('/edit-usuario-actual/:id', authController.isAuthenticated, usuariosController.update_current_user)
router_usuarios.get('/ajustes/usuarios-conf', authController.isAuthenticated, usuariosController.getUsers)
router_usuarios.get('/ajustes/new-usuario', authController.isAuthenticated, usuariosController.newUser)
router_usuarios.get('/ajustes/edit-usuario/:id', authController.isAuthenticated, usuariosController.getUser)
router_usuarios.post('/ajustes/edit-usuario/:id', authController.isAuthenticated, usuariosController.updateUser)
router_usuarios.get('/ajustes/usuarios-conf/deleteUser/:id', authController.isAuthenticated, usuariosController.deleteUser)

module.exports = router_usuarios
