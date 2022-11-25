const db = require('../database/db')
const {promisify} = require('util')


exports.createService = async (req, res) =>{
   try {
       const nombre = req.body.nombre
       const precio = req.body.precio
       const cod_opera = req.body.cod_opera
       const descripcion = req.body.descripcion
   
       db.query('INSERT INTO servicios SET ?', {nombre:nombre, precio:precio, descripcion:descripcion, cod_opera:cod_opera}, (error, results) => {
           if(error){console.log(error)}
           res.redirect('/ajustes/servicios-conf')
        //    console.log(results);
       })
       
       } catch (error) {
           console.log(error);
       }

}


    





