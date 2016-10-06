var userSignUp = {
    USER_SIGN_FAIL: 0,
    USER_SIGN_SUCCESS: 1,
    USER_HAVE_SIGNUP: 2,
    USER_SIGN_UNKNOW: 3,
};

var login = {
    USER_LOGIN_FAIL: 0,
    USER_LOGIN_SUCCESS: 1,
    USER_LOGIN_NOT_USER: 2,
    USER_LOGIN_UNKNOW: 3,
};

// var token = {
//     USER_TOKEN_IS_NIL : 0,      //token为空
//     USER_TOKEN_IS_LEGAL : 1,   //token 合法
//     USER_TOKEN_IS_ILLEGAL : 2, //token非法
//     USER_TOKEN_IS_OUTDATE : 3, //token过期
// };

module.exports.SIGNUP = userSignUp;
module.exports.LOGIN = login;
// module.exports.TOKEN = token;