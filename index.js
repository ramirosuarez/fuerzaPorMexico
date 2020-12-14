const express = require('express')
const app = express()
const port = process.env.PORT || 4000

//Se define bosyparser para visualizar los datos
var bodyParser = require('body-parser')


//Confiduracion de la cuenta de firebase
const { config } = require('./config/config')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var path = require('path')

const siteRoute = require('./routes/siteRoutes')
app.use('/static', express.static(__dirname + '/public'))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname + '/views'))

//Archivo de routeo
app.use('/', siteRoute)

//server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})