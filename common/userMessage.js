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

var loadUserinfo = {
    LOAD_USER_INFO_FAIL : 0,   //内部数据库错误
    LOAD_USER_INFO_SUCCESS : 1, //查询成功
    LOAD_USER_INFO_UNKNOW : 2,  //未知错误
}

var updateUserinfo = {
    UPDATE_USER_INFO_FAIL : 0,
    UPDATE_USER_INFO_SUCCESS : 1,
    UPDATE_USER_INFO_UNKNOW : 2,
}

// var token = {
//     USER_TOKEN_IS_NIL : 0,      //token为空
//     USER_TOKEN_IS_LEGAL : 1,   //token 合法
//     USER_TOKEN_IS_ILLEGAL : 2, //token非法
//     USER_TOKEN_IS_OUTDATE : 3, //token过期
// };

module.exports.SIGNUP = userSignUp;
module.exports.LOGIN = login;
module.exports.LOAD_USER_INFO = loadUserinfo;
module.exports.UPDATE_USER_INFO = updateUserinfo;
// module.exports.TOKEN = token;