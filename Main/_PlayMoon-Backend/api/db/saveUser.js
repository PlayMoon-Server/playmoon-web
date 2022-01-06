const User = require('./models/user_account')

//security

const hashString = require('../security/hashString')
const passwordSalting = require('../security/passwordSalting')
const checkPw = require('../services/checkPw')

//

module.exports = async(verifyToken, password, password2) => {
    var pwChecked = await checkPw(password, password2)
    try {
        //CHECK IF TOKEN IS VALID

        const userExists = await User.exists({ verifyToken: verifyToken })
        if (!userExists) return { err: true, error: "Dieser Verifytoken ist ungültig" }

        //--

        //USER EXISTS - (check if alredy has a pw) qwda1

        const user = await User.findOne({ verifyToken: verifyToken })
        if (user.password) return { err: true, error: "Dieser Verifytoken wurde bereits benutzt" }

        //--

        //CHECK IF PW IS Ok

        if (pwChecked.err) return { err: true, error: pwChecked.error }

        //--

        //SET PASSWORD OF USER WHERE VERIFYTOKEN=VERIFYTOKEN
        try {
            await User.updateOne({ verifyToken: verifyToken }, { password: hashString(passwordSalting(password)) }).exec()
            return { err: false, error: null }
        } catch (err) {
            return { err: true, error: "Die Daten konnten nicht abgespeichert werden, wende dich an den Support" }
        }

    } catch (err) {
        return { err: true, error: err }
    }
}