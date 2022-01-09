const User = require('./models/user_account')

//security

const hashString = require('../security/hashString')
const passwordSalting = require('../security/passwordSalting')
const checkPw = require('../services/checkPw')
const checkEmail = require('../services/checkEmail')
const genCookie = require('../db/genCookie')

//

module.exports = async(verifyToken, password, password2, email) => {
    if (!isValidData([verifyToken, password, password2])) return { err: true, error: "Fülle bitte alle Lücken aus!" }

    var pwChecked = await checkPw(password, password2)
    try {
        //CHECK IF TOKEN IS VALID

        const userExists = await User.exists({ verifyToken: verifyToken })
        if (!userExists) return { err: true, error: "Dieser Verifytoken ist ungültig" }

        //--

        //USER EXISTS - (check if alredy has a pw)

        const user = await User.findOne({ verifyToken: verifyToken })
        if (user.password) return { err: true, error: "Dieser Account existiert bereits, melde dich bitte an" }

        //--

        //CHECK IF PW IS Ok

        if (pwChecked.err) return { err: true, error: pwChecked.error }

        //--

        //SET PASSWORD OF USER WHERE VERIFYTOKEN=VERIFYTOKEN
        try {
            const pw = hashString(passwordSalting(password))

            if (checkEmail(email).err && email != null && email != "") return { err: true, error: "Deine Email ist ungültig" }
            await User.updateOne({ verifyToken: verifyToken }, { password: pw, email: email }).exec()
            return { err: false, error: null, userToken: await genCookie(verifyToken, pw) }
        } catch (err) {
            console.log(err)
            return { err: true, error: "Die Daten konnten nicht abgespeichert werden, wende dich an den Support" }
        }
    } catch (err) {
        return { err: true, error: "Die Datenbank funktioniert momentan nicht" }
    }
}

function isValidData(data) {
    for (var i = 0; i < data.length; i++) {
        if (!data[i]) {
            console.log(data[i], data)
            return false
        }
    }
    return true
}