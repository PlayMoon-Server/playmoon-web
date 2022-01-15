//--Libaries

const express = require('express')
const https = require('https')
const fs = require('fs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config({
    path: 'environment/.env'
})
const cors = require('cors')({
    origin: '*',
    isSecureContext: true
})


const secrets = {
    cert: fs.readFileSync('./environment/secrets/cert.pem'),
    privateKey: fs.readFileSync('./environment/secrets/privkey.pem')
}

//--Libaries

const app = express()
const server = https.createServer({
    cert: secrets.cert,
    key: secrets.privateKey
}, app)




const PORT = process.env.PORT || 5000

//ROUTES--START

const routeRegister = require('./routing/register')
const routeLogin = require('./routing/login')
const routeGetDataByCookie = require('./routing/getDataByCookie')
const routeCheckStatus = require('./routing/checkStatus')

//ROUTES--END

//--/API--START

var User = require('./api/db/models/user_account')

//--/API--END--


//--USE--

app.use(bodyParser('t'))
app.use(cookieParser('t'))
app.use(cors)

app.use(routeRegister)
app.use(routeLogin)
app.use(routeGetDataByCookie)
app.use(routeCheckStatus)


//--USE-END


//Connect to mongodb
let dbURI = process.env.dbURI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => server.listen(PORT, () => console.log(`--Backend running on port: ${PORT}--`)))
    .catch(err => server.listen(PORT, () => console.log(`--Backend running without Database-Connection on port ${PORT}--`, 'ERROR: ', err.message)))

app.get("/", (req, res) => {
    res.send({ data: "Herzlich willkommen bei der Api von PlayMoon.de!" })
})