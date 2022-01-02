const mongoose = require('mongoose')
const Schema = mongoose.Schema

let accountSchema = new Schema({
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    uuid: {
        type: String,
        required: true
    },
    dcTag: {
        type: String,
        required: false
    },
    verified: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })
let Account = mongoose.model("Account", accountSchema)

module.exports = Account