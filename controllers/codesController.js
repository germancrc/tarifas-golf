const db = require('../database/db')
const {promisify} = require('util')


exports.createCode = async (req, res) =>{
   try {
       const codigo = req.body.codigo
       const nombre = req.body.nombre
       const uso = req.body.uso
       const descripcion = req.body.descripcion
   
       db.query('INSERT INTO opera_codes SET ?', {codigo:codigo, nombre:nombre, uso:uso, descripcion:descripcion }, (error,  results) => {
           if(error){console.log(error)}
           res.redirect('/ajustes/opera-codes')
           console.log(results);
       })
       
   } catch (error) {
       console.log(error);
   }

}



