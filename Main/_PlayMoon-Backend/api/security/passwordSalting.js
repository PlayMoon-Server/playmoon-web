module.exports = (pw) => {
    let securityString = process.env.secretString
    pw += securityString
    return pw
}