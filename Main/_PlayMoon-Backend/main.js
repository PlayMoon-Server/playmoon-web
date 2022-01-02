const express = require('express')
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

let routeRegister = require('./routing/register')

//ROUTES--END

//--API--START

/*---------------------*/

//--API--END--

//--USE--

app.use(routeRegister)
app.use(cors);
app.use(bodyParser('t'))
app.use(cookieParser('t'))

//--USE-END

//Connect to mongodb
let dbURI = 'mongodb+srv://admin:PQ9KKqflvgdCcqRb@cluster0.rmzdz.mongodb.net/playmoon?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(PORT, () => console.log(`--Backend running on port: ${PORT}--`)))
    .catch(err => console.log(err, "!"))