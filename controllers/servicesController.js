const bcrypt = require('bcryptjs')
const db = require('../database/db')
const {promisify} = require('util')


exports.getServices = (req, res) =>{
    db.query('SELECT * FROM servicios', (error, results) => {
        if(error){
           throw error;
        }else{
          res.render('ajustes', {user:req.user, resultsServices:results})
          // console.log(resultsServices);
        }
     })

}


