module.exports = async(pw, pw2) => {
    var numbers = /[0-9]/g
    var upperCaseLetters = /[A-Z]/g

    var errorObject = { err: false, error: null }

    if (pw != pw2) errorObject = { err: true, error: "Deine Passwörter stimmen nicht überein" }
    else if (pw.length < 8) errorObject = { err: true, error: "Dein Passwort muss mindestens 8 Zeichen enthalten" }
    else if (numbers.test(pw) != true) errorObject = { err: true, error: "Dein Passwort muss mindestens 1 Zahl enthalten" }
    else if (upperCaseLetters.test(pw) != true) errorObject = { err: true, error: "Dein Passwort muss mindestens 1 Großbuchstaben enthalten" }

    return errorObject
}