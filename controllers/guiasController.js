const db = require('../database/db')

//subir guias
exports.uploadGuide = async (req, res) =>{
    try {
        const aplicacion = req.body.aplicacion
        const archivo = req.file.buffer.toString('base64')
    
         db.query('INSERT INTO guias_hrgolf SET ?', {aplicacion:aplicacion, archivo:archivo}, (error, results) => {
              if(error){console.log(error)}
              res.redirect('/ajustes/guias-conf')
         })
        console.log(aplicacion, archivo);
        
        } catch (error) {
            console.log(error);
        }

}


//MOSTRAR todas guias
exports.getGuides = (req, res) =>{
    try {
        db.query('SELECT*FROM guias_hrgolf ORDER BY aplicacion asc', (error, results) => {
            if(results){
               res.render('ajustes/guias-conf', {user:req.user, alert:false, results:results, error: false})
            }else{
               throw error;
            }
         })
    } catch (error) {
        console.log(error);
    }
 
}

// MOSTRAR 1 guia
exports.getGuide = (req, res) =>{
    try {

       
    } catch (error) {
        console.log(error);
    }
 
}

// EDITAR 1 guia
exports.updateGuide = (req, res) =>{
    try {

       
    } catch (error) {
        console.log(error);
    }
 
}

// BORRAR TTOO
exports.deleteGuide = (req, res) =>{
    try {

       
    } catch (error) {
        console.log(error);
    }


}
 




