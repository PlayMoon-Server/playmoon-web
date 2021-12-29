const express = require('express')
const router = express.Router()
const Verify = require("../api/db/models/verify")

//Routing via express in mehrern dateien zu einer main.js zusammengestellt

//Post request:
router.post('/auth/register', (req, res) => {
    //Cooming soon
})

module.exports = router