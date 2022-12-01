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

//MOSTRAR CODIGOS OPERA NUEVO TTOO
exports.getOperaCodes = (req, res) =>{
    try {
        db.query('SELECT * FROM opera_codes WHERE descripcion LIKE "%agencia%"', (error, results) => {
            if(results){
               res.render('ajustes/new-ttoo', {user:req.user, alert:false, results:results, error: false})
            }else{
               throw error;
            }
         })
    } catch (error) {
        console.log(error);
    }
}



//MOSTRAR TODOS LOS TTOO
exports.getTtoos = (req, res) =>{
    try {
        db.query('SELECT * FROM ttooRates', (error, results) => {
            if(results){
               res.render('ajustes/ttoo-conf', {user:req.user, alert:false, results:results, error: false})
            }else{
               throw error;
            }
         })
    } catch (error) {
        console.log(error);
    }
}

// MOSTRAR 1 TTOO
exports.getTtoo = (req, res) =>{
    try {
        const id = req.params.id;
        db.query('SELECT * FROM ttooRates WHERE id=?', [id], (error, results) => {
           if(results){
              res.render('ajustes/edit-ttoo', {user:req.user, ttoo:results[0], alert:false})
           }else{
              throw error;
           }
        })
    } catch (error) {
        console.log(error.message);
    }
}

// EDITAR 1 TTOO
exports.updateTtoo = (req, res) =>{
    try {
        const {id} = req.params;
        const {nombre, precio, cod_opera, operacion}= req.body;
        const editedTtoo = {nombre, precio, cod_opera, operacion};
        db.query('UPDATE ttooRates SET ? WHERE id = ?', [editedTtoo, id]);
        res.redirect('/ajustes/ttoo-conf');
    } catch (error) {
        console.log(error);
    }
}

// BORRAR TTOO
exports.deleteTtoo = (req, res) =>{
    try {
        const {id} = req.params;
        db.query('DELETE FROM ttooRates WHERE id = ?', [id]);
        res.redirect('/ajustes/ttoo-conf');
    } catch (error) {
        console.log(error);
    }
}




