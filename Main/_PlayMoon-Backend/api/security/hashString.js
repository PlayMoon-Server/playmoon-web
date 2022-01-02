const sha256 = require('sha256')

module.exports = (string) => {
    let hash = sha256(string)
    return hash
}