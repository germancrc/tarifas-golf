const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config();

const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect((error) => {
    if(error){
        console.log('Error de conexion: ' + error);
        return
    }
    console.log('Conectado a DB Planetscale');
})

module.exports = connection