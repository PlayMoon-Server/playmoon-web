const mongoose = require('mongoose')

module.exports = () => {
    let con = mongoose.connection.readyState
    return con
}