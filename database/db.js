const mysql = require("mysql");

const hostname = "382.h.filess.io";
const database = "golfdb_brokewrote";
const port = "3307";
const username = "golfdb_brokewrote";
const password = "db0ef194e9c44248b38400c9d28c2ea46c0ce2cd";

const connection = mysql.createConnection({
  host: hostname,
  user: username,
  password: password,
  database: database,
  port: port,
});

connection.connect((error) => {
  if (error) {
    console.log('Error de conexion: ' + error);
    return;
  }
  console.log('Connected!');
});

module.exports = connection;

