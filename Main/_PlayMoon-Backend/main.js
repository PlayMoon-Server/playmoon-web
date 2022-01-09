const express = require('express')
const https = require('https')
const fs = require('fs')

const secrets = {
    cert: fs.readFileSync('./environment/secrets/cert.pem'),
    privateKey: fs.readFileSync('./environment/secrets/privkey.pem')
}

const app = express()
const server = https.createServer({
    cert: secrets.cert,
    key: secrets.privateKey
}, app)
const router = express.Router()


const dotenv = require('dotenv').config({
    path: 'environment/.env'
})
const cors = require('cors')({
    origin: '*',
    isSecureContext: true
})
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000

//ROUTES--START

const routeRegister = require('./routing/register')
const routeLogin = require('./routing/login')
const routeGetDataByCookie = require('./routing/getDataByCookie')

//ROUTES--END

//--API--START

var User = require('./api/db/models/user_account')

/*---------------------*/

//--API--END--

//--USE--
app.use(bodyParser('t'))
app.use(cookieParser('t'))
app.use(cors)

app.use(routeRegister)
app.use(routeLogin)
app.use(routeGetDataByCookie)


//--USE-END

//Connect to mongodb
let dbURI = process.env.dbURI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => server.listen(PORT, () => console.log(`--Backend running on port: ${PORT}--`)))
    .catch(err => server.listen(PORT, () => console.log(`--Backend running without Database-Connection on port ${PORT}--`, 'ERROR: ', err.message)))

app.get("/", (req, res) => {
    res.send({ data: "Herzlich willkommen bei der Api von PlayMoon.de!" })
})