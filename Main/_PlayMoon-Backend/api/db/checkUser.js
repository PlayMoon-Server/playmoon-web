const User = require('../db/models/user_account')
const hashString = require('../security/hashString')
const passwordSalting = require('../security/passwordSalting')
const genCookie = require('./genCookie')

module.exports = async(playername, pw) => {
    //-  

    if (!pw) return { err: true, error: "Bitte gebe ein Passwort an" }

    //--

    //-

    const userExists = await User.exists({ playerName: playername })
    if (!userExists) return { err: true, error: "Dieser Benutzer existiert nicht" }

    //--


    //-

    const user = await User.findOne({ playerName: playername })
    if (user.password != hashString(passwordSalting(pw))) return { err: true, error: "Dein Passwort ist ungültig" }

    const cookie = await genCookie(user.verifyToken, user.password)
    return { err: false, error: null, cookieToken: cookie }
    //--

}