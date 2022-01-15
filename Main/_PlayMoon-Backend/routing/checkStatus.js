const router = require('express').Router()
const dbOnline = require('../api/db/dbOnline')

router.get('/get/database/status', (req, res) => {
    let statusState = dbOnline()
    res.send({
        status: statusState,
        msg: false,
        content: (statusState == 0) ? 'offline' : (statusState == 1) ? 'online' : (statusState == 2) ? 'connecting' : 'disconnecting',
    })
})

module.exports = router