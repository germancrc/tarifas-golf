require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT;

//servir contenido estatico
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})