const mongoose = require('mongoose')
const Schema = mongoose.Schema

let accountSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    uuid: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true
    }
})

let Account = mongoose.model("Account", accountSchema)

module.exports = Account