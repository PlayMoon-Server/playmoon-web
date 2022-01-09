const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userAccountSchema = new Schema({
    verifyToken: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    rank: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    ip: {
        type: String,
        required: false
    }

}, { timestamps: true, collection: 'user_accounts' })

const UserAccount = mongoose.model('user_account', userAccountSchema)

module.exports = UserAccount