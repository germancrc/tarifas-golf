const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')



const app = express()
let port = process.env.PORT || 3000

//cors
app.use(cors())




//motor plantillas
app.set('view engine', 'ejs')

//carpeta public
app.use(express.static('public'))

// middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json());

//Vriables entorno
dotenv.config({path: './env/.env'})

//cookies
app.use(cookieParser())

//llamar router
app.use('/', require('./routes/router'))

//para eliminar cache al cerrar sesion
app.use(function(req, res, next){
  if(!req.user)
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});



//iniciar servidor
app.listen(port, () => {
  console.log(`Servidor listening on port ${port}`)
})


            