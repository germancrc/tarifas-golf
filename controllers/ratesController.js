const bcrypt = require('bcryptjs')
const db = require('../database/db')
const {promisify} = require('util')


exports.getRates = (req, res) =>{
   db.query('SELECT * FROM tarifas', (error, results) => {
      if(error){
         throw error;
      }else{
        res.render('ajustes', {user:req.user, resultsRates:results})
       // console.log(resultsRates);
      }
   })

}


