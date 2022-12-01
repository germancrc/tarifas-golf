const bcrypt = require('bcryptjs')
const db = require('../database/db')
const {promisify} = require('util')

// CREAR USER
exports.createUser = async (req, res) =>{
    try {
        const nombre = req.body.nombre
        const username = req.body.username
        const password = req.body.password
        let passHash = await bcrypt.hash(password,8)
        const rol = req.body.rol
    
        db.query('INSERT INTO usuarios SET ?', {nombre:nombre, username:username, password:passHash, rol:rol}, (error, results) => {
            if(results){
                res.redirect('/ajustes/usuarios-conf')
            }
        })
        
        } catch (error) {
            console.log(error);
        }

}
//MOSTRAR TODOS LOS USERS
exports.getUsers = (req, res) =>{
    try {
        db.query('SELECT * FROM usuarios', (error, results) => {
            if(results){
               res.render('ajustes/usuarios-conf', {logged:req.user, alert:false, results:results, error: false})
            }else{
               throw error;
            }
         })
        } catch (error) {
            console.log(error);
        }
}

// MOSTRAR 1 USER
exports.getUser = (req, res) =>{
    try {
        const id = req.params.id;
        db.query('SELECT * FROM usuarios WHERE id=?', [id], (error, results) => {
           if(results){
              res.render('ajustes/edit-usuario', {logged:req.user, user:results[0], alert:false})
           }else{
              throw error;
           }
        })
    } catch (error) {
        console.log(error);
    }
}

// EDITAR 1 USER PENDIENTE
exports.updateUser = (req, res) =>{
    // try {
    //     const {id} = req.params;
    //     const {nombre, precio }= req.body;
    //     const editedUser = {nombre, precio};
    //     db.query('UPDATE usuarios SET ? WHERE id = ?', [editedUser, id]);
    //     res.redirect('/ajustes/usuarios-conf');
    // } catch (error) {
    //     console.log(error);
    // }
}

// BORRAR USER
exports.deleteUser = (req, res) =>{
    try {
        const {id} = req.params;
        db.query('DELETE FROM usuarios WHERE id = ?', [id]);
        res.redirect('/ajustes/usuarios-conf');
    } catch (error) {
        console.log(error);
    }
}




