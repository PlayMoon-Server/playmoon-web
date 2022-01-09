const User = require('../db/models/user_account')
const hashString = require('../security/hashString')
const passwordSalting = require('../security/passwordSalting')
const genCookie = require('./genCookie')

module.exports = async(name, pw) => {
    //-  

    if (!name) return { err: true, error: "Bitte gib einen Spielernamen an" }
    if (!pw) return { err: true, error: "Bitte gib ein Passwort an" }

    //--

    //-
    try {

        const userExists = await User.exists({ name: name })
        console.log(await User.find())
        if (!userExists) return { err: true, error: "Dieser Benutzer existiert nicht" }

        //--


        //-

        const user = await User.findOne({ name: name })
        if (user.password != hashString(passwordSalting(pw))) return { err: true, error: "Dein Passwort ist ungültig" }

        const cookie = await genCookie(user.verifyToken, user.password)
        return { err: false, error: null, userToken: cookie }
    } catch (err) {
        return { err: true, error: 'Die Datenbank funktioniert momentan nicht!' }
    }
    //--

}