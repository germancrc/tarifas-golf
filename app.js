const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const router_tarifas = express.Router()

const app = express()
let port = process.env.PORT || 3000

//cors
app.use(cors())

//motor plantillas
app.set('view engine', 'ejs')

//carpeta public
app.use(express.static('public'))

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Variables entorno
dotenv.config({ path: './env/.env' })

//cookies
app.use(cookieParser())

//llamar router
app.use('/', require('./routes/router.auth'))
app.use('/', require('./routes/router.opera_codes'))
app.use('/', require('./routes/router.guias'))
app.use('/', require('./routes/router.tarifas_cg'))
app.use('/', require('./routes/router.tarifas_mg'))
app.use('/', require('./routes/router.servicios'))
app.use('/', require('./routes/router.pm'))
app.use('/', require('./routes/router.ttoo'))
app.use('/', require('./routes/router.usuarios'))
app.use('/', require('./routes/router.rutinas'))
app.use('/', require('./routes/router.views'))

app.get('*', (req, res) => {
	res.render('404')
})

//para eliminar cache al cerrar sesion
app.use(function (req, res, next) {
	if (!req.user) res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
	next()
})

//iniciar servidor
app.listen(port, () => {
	console.log(`Servidor listening on port ${port}`)
})
