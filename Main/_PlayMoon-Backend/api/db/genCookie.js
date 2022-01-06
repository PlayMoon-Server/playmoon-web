const jwt = require('jsonwebtoken')

module.exports = async(verifyToken, pw) => {
    const secretKey = process.env.jwtSecret
    const cookie = jwt.sign({ verifyToken: verifyToken, pw: pw }, secretKey, { expiresIn: '30d' })
    return cookie
}