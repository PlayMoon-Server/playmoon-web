module.exports = (email) => {
    if (!validateEmail(email)) return { err: true, error: "Diese Email ist nicht valide" }
    return { err: false, error: null }
}

function validateEmail(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mailformat.test(email)) {
        return true;
    } else {
        return false;
    }
}