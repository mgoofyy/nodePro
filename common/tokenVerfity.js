const jwt = require('jwt-simple');
const CONFIG = require('./../config');

const TOKEN_INFO = {
    TOKEN_IS_OUTDATE : 0, // 过期
    TOKEN_IS_ILLEGAL : 1, // 不合法
    TOKEN_IS_LEGAL   : 2, // 合法的token
    TOKEN_IS_DISABLE : 3, // 不可用的token
}

var token = new Function();

token.prototype.verfity = function(callback) {
    var token = this;
    if (token) {
        try {
            var decoded = jwt.decode(token, app.get(CONFIG.TOKEN.JWT_SIMPLE_TOKEN_APP_SECRET_KEY));
            if (decoded.exp <= Date.now()) {
                return callback(new Error('token已经失效'),TOKEN_IS_OUTDATE);
            }
            else {
                return callback(null,TOKEN_IS_OUTDATE,decoded.userid);
            }

        } catch (err) {
            return callback(new Error('token非法'),TOKEN_IS_ILLEGAL);
        }
    } else {
        return callback(new Error('token不存在'),TOKEN_IS_DISABLE);
    }
};

token.encode = function(userid,expirse,callback) {
    //构造token token主要包括 userid和有效期时间
    var expires = moment().add('days', CONFIG.TOKEN.JWT_SIMPLE_TOKEN_APP_SECRET_EXPIRES).valueOf();
    var token = jwt.encode({
        userid: userid,
        expires: expires
    }, app.get(CONFIG.JWT_SIMPLE_TOKEN_APP_SECRET_KEY));

    return callback(token);
};

module.exports.token = token;
module.exports.tokenInfo = TOKEN_INFO;