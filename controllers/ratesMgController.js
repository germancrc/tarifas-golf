const db = require('../database/db')
const {promisify} = require('util')


exports.createRateMg = async (req, res) =>{
   try {
       const nombre = req.body.nombre
       const precio = req.body.precio
   
       db.query('INSERT INTO tarifasmg SET ?', {nombre:nombre, precio:precio}, (error, results) => {
           if(error){console.log(error)}
           res.redirect('/ajustes/tarifas-mg')
           console.log(results);
       })
       
   } catch (error) {
       console.log(error);
   }

}



