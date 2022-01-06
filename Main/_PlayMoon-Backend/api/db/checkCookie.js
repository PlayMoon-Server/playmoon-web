const jwt = require('jsonwebtoken')
const User = require('../db/models/user_account')

module.exports = async(cookie) => {
    const secretKey = process.env.jwtSecret

    try {
        const verifiedCookie = jwt.verify(cookie, secretKey)
    } catch (err) {
        return { err: true, error: "Dieser Cookie ist ungültig!" }
    }

    //COOKIE VALID ------ SEE IF USER STILL EXIST OR PASSWORD CHANGED

    const cookieVerifyToken = jwt.decode(cookie).verifyToken
    const cookiePw = jwt.decode(cookie).pw

    const userExists = await User.exists({ verifyToken: cookieVerifyToken })

    if (!userExists) return { err: true, error: "Dieser Cookie ist ungültig" }

    const user = await User.findOne({ verifyToken: cookieVerifyToken })

    if (user.password != cookiePw) return { err: true, error: "Dieser Cookie ist ungültig" }

    return { err: false, error: null, user: user }

    //--
}