const jwt = require('jwt-simple');
const CONFIG = require('./../config');
var moment = require('moment');
var app = require('express')();

const TOKEN_INFO = {
    TOKEN_IS_NULL: 0, // 空的token
    TOKEN_IS_LEGAL: 1, // 合法
    TOKEN_IS_ILLEGAL: 2, // 不合法的token
    TOKEN_IS_OUT_DATE: 3, // 过期的
}

var Token = new Function();

Token.prototype.verfity = function (callback) {
    var token = this.token;
    console.log(token);
    if (token) {
        try {
            var decoded = jwt.decode(token, CONFIG.TOKEN.JWT_SIMPLE_TOKEN_APP_SECRET_STRING);
            console.log(decoded)
            if (decoded.expires <= Date.now()) {
                console.log(decoded)
                return callback(new Error('token已经失效'), TOKEN_INFO.TOKEN_IS_OUT_DATE);
            } else {
                console.log(decoded)
                return callback(null, TOKEN_INFO.TOKEN_IS_LEGAL, decoded.userid);
            }
        } catch (err) {
            return callback(new Error('token非法'), TOKEN_INFO.TOKEN_IS_ILLEGAL);
        }
    } else {
        return callback(new Error('token不存在'), TOKEN_INFO.TOKEN_IS_NULL);
    }
};

Token.encode = function (userid, callback) {
    //构造token token主要包括 userid和有效期时间
    var expires = moment().add(CONFIG.TOKEN.JWT_SIMPLE_TOKEN_APP_SECRET_EXPIRES, 'days').valueOf();
    var token = jwt.encode({
        userid: userid,
        expires: expires
    }, CONFIG.TOKEN.JWT_SIMPLE_TOKEN_APP_SECRET_STRING);

    return callback(token);
};

module.exports.token = Token;
module.exports.TOKEN_INFO = TOKEN_INFO;