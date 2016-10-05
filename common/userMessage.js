var userSignUp = {
    USER_SIGN_FAIL   : 0,
    USER_SIGN_SUCCESS: 1,
    USER_HAVE_SIGNUP : 2,
    USER_SIGN_UNKNOW : 3,
};

var login = {
    USER_LOGIN_FAIL : 0,
    USER_LOGIN_SUCCESS : 1,
    USER_LOGIN_NOT_USER : 2,
    USER_LOGIN_UNKNOW  : 3,
};

module.exports.SIGNUP = userSignUp;
module.exports.LOGIN = login;