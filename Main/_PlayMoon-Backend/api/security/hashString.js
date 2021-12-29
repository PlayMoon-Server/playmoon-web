const sha265 = require('sha256')

module.exports = (string) => {
    let hash = sha265(string)
    return hash
}