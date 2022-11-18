const db = require('../database/db')
const {promisify} = require('util')


exports.createTtoo = async (req, res) =>{
   try {
       const nombre = req.body.nombre
       const precio = req.body.precio
       const cod_opera = req.body.cod_opera
       const operacion = req.body.operacion
   
       db.query('INSERT INTO ttooRates SET ?', {nombre:nombre, precio:precio, cod_opera:cod_opera, operacion:operacion}, (error,  results) => {
           if(error){console.log(error)}
           res.redirect('/ajustes/ttoo-conf')
           console.log(results);
       })
       
   } catch (error) {
       console.log(error);
   }

}



