const jwt = require('jwt-simple');
const CONFIG = require('./../config');
var moment = require('moment');
var app = require('express')();

const TOKEN_INFO = {
    TOKEN_IS_OUTDATE: 0, // 过期
    TOKEN_IS_ILLEGAL: 1, // 不合法
    TOKEN_IS_LEGAL: 2, // 合法的token
    TOKEN_IS_DISABLE: 3, // 不可用的token
}

var Token = new Function();

Token.prototype.verfity = function (callback) {
    var token = this;
    if (token.token) {
        try {
            var decoded = jwt.decode(token, CONFIG.TOKEN.JWT_SIMPLE_TOKEN_APP_SECRET_STRING);
            if (decoded.exp <= Date.now()) {
                return callback(new Error('token已经失效'), TOKEN_INFO.TOKEN_IS_OUTDATE);
            } else {
                return callback(null, TOKEN_INFO.TOKEN_IS_OUTDATE, decoded.userid);
            }

        } catch (err) {
            return callback(new Error('token非法'), TOKEN_INFO.TOKEN_IS_ILLEGAL);
        }
    } else {
        return callback(new Error('token不存在'), TOKEN_INFO.TOKEN_IS_DISABLE);
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
module.exports.tokenInfo = TOKEN_INFO;