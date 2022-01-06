const express = require('express')
const router = express.Router()

const app = express()

const dotenv = require('dotenv').config({
    path: 'environment/.env'
})
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')({
    origin: '*'
})
const mongoose = require("mongoose")
const PORT = process.env.PORT | 5000

//ROUTES--START

const routeRegister = require('./routing/register')
const routeGetDataByCookie = require('./routing/getDataByCookie')

//ROUTES--END

//--API--START

var User = require('./api/db/models/user_account')


/*---------------------*/

//--API--END--

//--USE--
app.use(bodyParser('t'))
app.use(cookieParser('t'))
app.use(cors);

app.use(routeRegister)
app.use(routeGetDataByCookie)


//--USE-END

//Connect to mongodb
let dbURI = process.env.dbURI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(PORT, () => console.log(`--Backend running on port: ${PORT}--`)))
    .catch(err => console.log('new Error while starting the Database: ', err))