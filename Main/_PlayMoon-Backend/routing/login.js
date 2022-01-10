const express = require('express')
const router = express.Router()
const hashString = require('../api/security/hashString')
const checkUser = require('../api/db/checkUser')

//Routing via express in mehrern dateien zu einer main.js zusammengestellt

//Post request:
router.post('/auth/login', async(req, res) => {
    res.send(await checkUser(req.body.name, req.body.pw, req.ip))
})

module.exports = router