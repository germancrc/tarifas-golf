const db = require('../database/db')
const {promisify} = require('util')


exports.createRateMg = async (req, res) =>{
   try {
       const nombre = req.body.nombre
       const precio = req.body.precio
       const cod_opera = req.body.cod_opera
       const descripcion = req.body.descripcion
   
       db.query('INSERT INTO tarifasmg SET ?', {nombre:nombre, precio:precio, cod_opera:cod_opera, descripcion:descripcion}, (error,  results) => {
           if(error){console.log(error)}
           res.redirect('/ajustes/tarifas-mg')
        //    console.log(results);
       })
       
   } catch (error) {
       console.log(error);
   }

}



