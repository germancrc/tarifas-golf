const bcrypt = require('bcryptjs')
const db = require('../database/db')
const {promisify} = require('util')

//metodo registro

exports.agregarUsuario = async (req, res) =>{
    try {
        const nombre = req.body.nombre
        const username = req.body.username
        const password = req.body.password
        let passHash = await bcrypt.hash(password,8)
        const rol = req.body.rol
    
        db.query('INSERT INTO usuarios SET ?', {nombre:nombre, username:username, password:passHash, rol:rol}, (error, results) => {
            if(error){console.log(error)}
            res.redirect('/ajustes')
        })
        
    } catch (error) {
        console.log(error);
    }

}


