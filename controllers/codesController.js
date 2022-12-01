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

//MOSTRAR TODOS LOS CODES
exports.getCodes = (req, res) =>{
    try {
        db.query('SELECT * FROM opera_codes order by uso asc', (error, results) => {
            if(results){
               res.render('ajustes/opera-codes', {user:req.user, alert:false, results:results, error: false})
            }else{
               throw error;
            }
         })
    } catch (error) {
        console.log(error);
    }
}

// MOSTRAR 1 CODE
exports.getCode = (req, res) =>{
    try {
        const id = req.params.id;
        db.query('SELECT * FROM opera_codes WHERE id=?', [id], (error, results) => {
           if(results){
              res.render('ajustes/edit-codes', {user:req.user, code:results[0], alert:false})
           }else{
              throw error;
           }
        })
    } catch (error) {
        console.log(error.message);
    }
}

// EDITAR 1 CODE
exports.updateCode = (req, res) =>{
    try {
        const {id} = req.params;
        const {codigo,nombre,uso, descripcion}= req.body;
        const editedCode = {codigo, nombre, uso, descripcion};
        db.query('UPDATE opera_codes SET ? WHERE id = ?', [editedCode, id]);
        res.redirect('/ajustes/opera-codes');
    } catch (error) {
        console.log(error);
    }
}

// BORRAR CODE
exports.deleteCode = (req, res) =>{
    try {
        const {id} = req.params;
        db.query('DELETE FROM opera_codes WHERE id = ?', [id]);
        res.redirect('/ajustes/opera-codes');
    } catch (error) {
        console.log(error);
    }
}








