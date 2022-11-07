const db = require('../database/db')
const {promisify} = require('util')


exports.createService = async (req, res) =>{
   try {
       const nombre = req.body.nombre
       const precio = req.body.precio
       const descripcion = req.body.descripcion
   
       db.query('INSERT INTO servicios SET ?', {nombre:nombre, precio:precio, descripcion:descripcion}, (error, results) => {
           if(error){console.log(error)}
           res.redirect('/servicios-conf')
           console.log(results);
       })
       
       } catch (error) {
           console.log(error);
       }

}

exports.updateService = (req, res) => {
    try{
        const id = req.body.id;
        const nombre = req.body.nombre
        const precio = req.body.precio
        const descripcion = req.body.descripcion
    
        db.query('UPDATE servicios SET ? WHERE id = ?', [{nombre:nombre, precio:precio, descripcion:descripcion}, id], (error, results) => {
            if(error){console.log(error)}
            res.redirect('/servicios-conf', {service:results[0]})
            console.log(results);
        })
    }
    
    catch (error) {
        console.log(error);
    }

}



