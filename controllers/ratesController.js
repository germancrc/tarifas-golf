const db = require('../database/db')
const {promisify} = require('util')


exports.createRate = async (req, res) =>{
   try {
       const nombre = req.body.nombre
       const precio = req.body.precio
   
       db.query('INSERT INTO tarifas SET ?', {nombre:nombre, precio:precio}, (error, results) => {
           if(error){console.log(error)}
           res.redirect('/tarifas-conf')
       })
       
   } catch (error) {
       console.log(error);
   }

}



