const express = require('express')
const router = express.Router()

const saveUser = require('../api/db/saveUser')

//Routing via express in mehrern dateien zu einer main.js zusammengestellt

//Post request:
router.post('/auth/register', async(req, res) => {
    //Cooming soon
    res.send(await saveUser(req.body.verifyToken, req.body.pw, req.body.pw2, req.body.email))
})

module.exports = router