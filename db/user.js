var db = require('./dbManger');
var mysql = require('mysql');
var ObjectUtil = require('./../utils/objUtil');
var moment = require('moment');
var USER_MESSAGE = require('./../common/userMessage');

var Users = new Function();

Users.prototype.signupSave = function (user, callback) {
    db.open(function (error) {
        if (error) {
            return callback(new Error('打开数据库出错'), USER_MESSAGE.SIGNUP.USER_SIGN_FAIL);
        }
    });

    //查询数据库 查询某个手机号是否注册过
    const escapePhone = mysql.escape(user.phone);
    const escapePassword = mysql.escape(user.password);
    const searchString = 'SELECT * FROM user WHERE ow_profile_phone =' + escapePhone;
    db.query(searchString, function (err, result) {
        if (err) {
            db.close();
            return callback(err, USER_MESSAGE.SIGNUP.USER_SIGN_FAIL);
        }

        if (result.length !== 0) {
            db.close();
            return callback(new Error('已经注册'), USER_MESSAGE.SIGNUP.USER_HAVE_SIGNUP);
        } else {
            const queryString = 'INSERT INTO user (ow_profile_phone,ow_profile_password) VALUES (' + escapePhone + ',' + escapePassword + ')';
            console.log(queryString);
            db.query(queryString, function (err) {
                if (err) {
                    db.close();
                    return callback(err, USER_MESSAGE.SIGNUP.USER_SIGN_FAIL);
                }
                //获取UID信息
                db.query(searchString, function (err, result) {
                    if (err) {
                        db.close();
                        return callback(err, USER_MESSAGE.SIGNUP.USER_SIGN_FAIL);
                    }
                    const userid = result[0].ow_profile_userid;
                    console.log(ObjectUtil.print(result[0]));

                    const signFrom = mysql.escape(user.signFrom);
                    const nowTimestamp = moment().format('x');
                    const device = mysql.escape(user.device);
                    const queryStringToUserDeviceInfo = 'INSERT INTO user_sign_info (ow_profile_userid,ow_account_from,ow_account_last_login,ow_account_signup_time,ow_account_online_time,ow_account_devices) VALUES (' +
                        userid + ',' + signFrom + ',' + nowTimestamp + ',' + nowTimestamp + ',' + '0' + ',' + device + ')';
                    db.query(queryStringToUserDeviceInfo, function (err) {
                        db.close();
                        if (err) {
                            return callback(err, USER_MESSAGE.SIGNUP.USER_SIGN_FAIL);
                        }
                        return callback(null, USER_MESSAGE.SIGNUP.USER_LOGIN_SUCCESS);
                    });

                })
            });
        }
    });
}

Users.prototype.verfityPassword = function (userinfo, callback) {
    db.open(function (error) {
        if (error) {
            return callback(error, USER_MESSAGE.LOGIN.USER_LOGIN_FAIL);
        }
    });
    const escapePhone = mysql.escape(userinfo.phone);
    const escapePassword = mysql.escape(userinfo.password);
    const searchString = 'SELECT * FROM user WHERE ow_profile_phone =' + escapePhone + 'AND ow_profile_password = ' + escapePassword;

    db.query(searchString, function (err, result) {
        db.close();
        if (err) {
            return callback(new Error('查询数据库出错'), USER_MESSAGE.LOGIN.USER_LOGIN_FAIL);
        }
        if (result.length === 0) {
            return callback(new Error('没有该用户'), USER_MESSAGE.LOGIN.USER_LOGIN_NOT_USER);
        } else {
            return callback(null, USER_MESSAGE.LOGIN.USER_LOGIN_SUCCESS, result[0]);
        }
    });
}

//从数据库中查询用户的信息
Users.prototype.loadUserinfo = function (userid, callback) {
    db.open(function (error) {
        if (error) {
            return callback(new Error('打开数据库出错'), USER_MESSAGE.LOAD_USER_INFO.LOAD_USER_INFO_FAIL);
        }
    });
    const escapeUserId = mysql.escape(userid);
    const searchString = 'SELECT * FROM user WHERE ow_profile_userid = ' + escapeUserId;

    db.query(searchString, function (error, result) {
        db.close();
        if (error) {
            return callback(new Error('查询数据库出错'), USER_MESSAGE.LOAD_USER_INFO.LOAD_USER_INFO_FAIL);
        }
        if (result.length === 0) {
            return callback(new Error('没有该用户,数据库内部错误'), USER_MESSAGE.LOAD_USER_INFO.LOAD_USER_INFO_FAIL)
        } else {
            return callback(null, USER_MESSAGE.LOAD_USER_INFO.LOAD_USER_INFO_SUCCESS, result[0]);
        }
    });
}

//更改数据库中用户信息
Users.prototype.updateUserinfo = function (userinfo, callback) {
    db.open(function (error) {
        if (error) {
            return callback(error, USER_MESSAGE.UPDATE_USER_INFO.UPDATE_USER_INFO_FAIL);
        }
    });
    const updateString = 'UPDATE user SET ow_profile_nickname=?,ow_profile_place=?,ow_profile_age=?,ow_profile_sex=?,ow_profile_signature=? WHERE ow_profile_userid=?';
    const updateParams = [mysql.escape(userinfo.nickname),mysql.escape(userinfo.place),mysql.escape(userinfo.age),mysql.escape(userinfo.sex),mysql.escape(userinfo.signature),userinfo.userid];
    db.update(updateString,updateParams,function(error,result){
        db.close();
        console.log(error);
        if(error) {
            return callback(error,USER_MESSAGE.UPDATE_USER_INFO.UPDATE_USER_INFO_FAIL);
        }
        return callback(null,USER_MESSAGE.UPDATE_USER_INFO.UPDATE_USER_INFO_SUCCESS);
    });
}

module.exports = Users;