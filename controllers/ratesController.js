const db = require('../database/db')
const {promisify} = require('util')


exports.createRate = async (req, res) =>{
   try {
       const nombre = req.body.nombre
       const precio = req.body.precio
       const cod_opera = req.body.cod_opera
   
       db.query('INSERT INTO tarifas SET ?', {nombre:nombre, precio:precio, cod_opera:cod_opera}, (error, results) => {
           if(error){console.log(error)}
           res.redirect('/ajustes/tarifas-conf')
           console.log(results);
       })
       
   } catch (error) {
       console.log(error);
   }

}



