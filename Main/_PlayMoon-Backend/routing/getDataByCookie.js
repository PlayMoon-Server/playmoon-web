//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJpZnlUb2tlbiI6InRlc3QxNCJ9.VOFC6UbFz-l7RspU_eDRWRBf6r9FNtCseeD2wZ-KQcY
const express = require('express')
const router = express.Router()

const checkCookie = require('../api/db/checkCookie')

//Routing via express in mehrern dateien zu einer main.js zusammengestellt

//Post request:
router.post('/get/user/byCookieToken', async(req, res) => {
    res.send(await checkCookie(req.body.cookieToken))
})

module.exports = router