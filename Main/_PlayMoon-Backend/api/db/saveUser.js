const Account = require("../db/models/account")

module.exports = async(user) => {
    return new Promise((res, rej) => {
        Account.create(user)
            .then(result => {
                res(result)
            })
            .catch(err => {
                rej(err)
            })
    })
}