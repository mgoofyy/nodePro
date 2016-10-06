//注册的平台
var SIGN_UP_FROM = {
    SIGN_UP_FROM_PHONE: 0,
    SIGN_UP_FROM_SINA: 1,
    SIGN_UP_FROM_QQ: 2,
    SIGN_UP_FROM_WECHAt: 3,
};

var USER_DEVICE_TYPE = {
    IPHONE: 0,
    IPAD: 1,
    ANDROID: 2,
};

var USER_LOCK_TYPE = {
    LOCK: 0,
    NOT_LOCK: 1,
};

//账户注册情况
var USER_SIGNUP_STATUS = {
    USER_HAVE_SIGN_UP: 0, //已经注册
    USER_NOT_SIGN_UP: 1, //尚未注册
    USER_HAVE_LOCK: 2, //账户被锁定
};

var USER_TYPE = {

};


module.exports.SIGN_UP_FROM = SIGN_UP_FROM;
module.exports.USER_DEVICE_TYPE = USER_DEVICE_TYPE;
module.exports.USER_SIGNUP_STATUS = USER_SIGNUP_STATUS;