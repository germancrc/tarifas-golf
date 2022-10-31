import express from "express"; //para importar express luego de instalarlo
import cors from "cors";
import db from "./config/db.js"
import indexRouter from "./routes/index.route.js";

const app = express()
const port = process.env.PORT;

//cors
app.use(cors())

// middleware
app.use(express.json()); 

//servir contenido estatico
app.use(express.static('public'));

//ruta API
app.use("/", indexRouter);

//rutas locales
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

//conexion a la DB con Planetscale
db.connect().then(() => {
  console.log("Conectado a la Base de Datos GOLF");
}).catch((err) => {
  console.log("Error: ", err);
})


//iniciar servidor
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})