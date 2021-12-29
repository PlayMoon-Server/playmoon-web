const mongoose = require('mongoose')
const Schema = mongoose.Schema

const verifySchema = new Schema({
    username: {
        type: String,
        required: true
    },
    user: {
        type: Number,
        required: true
    },
    verifyCode: {
        type: Number,
        required: true
    },
    verified: Boolean
}, { timestamps: true })

const Verify = mongoose.model('Verify', verifySchema)

module.exports = Verify