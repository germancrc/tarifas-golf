const bcrypt = require('bcryptjs')
const db = require('../database/db')
const {promisify} = require('util')


//metodo registro

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

exports.getUsers = (req, res) =>{
    db.query('SELECT * FROM usuarios', (error, results) => {
        if(results){
            if(req.user.rol === "Admin"){
               res.render('usuarios-conf', {user:req.user, alert:false, resultsUsers:results})
              // console.log(resultsUsers);
            }else{
               res.render('index', {user:req.user, alert:false})
              // console.log(resultsUsers);
            }
        }else{
            throw error;
        }
     })

}





