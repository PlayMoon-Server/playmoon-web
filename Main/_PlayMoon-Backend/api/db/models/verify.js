const mongoose = require('mongoose')
const Schema = mongoose.Schema

const verifySchema = new Schema({
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