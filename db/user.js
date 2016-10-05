var db = require('./dbManger');
var mysql = require('mysql');
var ObjectUtil = require('./../utils/objUtil');
var moment = require('moment');
var USER_SIGNUP_STATUS = require('./../common/userMessage').SIGNUP;

var Users = new Function();

Users.prototype.signupSave = function(user,callback) {
    db.open(function(error){
        if(error) {
            return;
        }
    });

    //查询数据库 查询某个手机号是否注册过
    const escapePhone = mysql.escape(user.phone);
    const escapePassword = mysql.escape(user.password);
    const searchString = 'SELECT * FROM user WHERE ow_profile_phone =' + escapePhone;
    db.query(searchString,function(err,result){
        if(err) {
            return callback(err,USER_SIGNUP_STATUS.USER_SIGN_FAIL);
        }

        if(result.length !== 0) {
            return callback(new Error('已经注册'),USER_SIGNUP_STATUS.USER_HAVE_SIGNUP);
        } else {
            const queryString = 'INSERT INTO user (ow_profile_phone,ow_profile_password) VALUES (' + escapePhone + ',' + escapePassword + ')';
            console.log(queryString);
            db.query(queryString,function(err){
                if(err) {
                    db.close();
                    return callback(err,USER_SIGNUP_STATUS.USER_SIGN_FAIL);
                }
                //获取UID信息
                db.query(searchString,function(err,result){
                    if(err) {
                        return callback(err,USER_SIGNUP_STATUS.USER_SIGN_FAIL);
                    }
                    const userid = result[0].ow_profile_userid;
                    console.log(ObjectUtil.print(result[0]));

                    const signFrom = mysql.escape(user.signFrom);
                    const nowTimestamp = moment().format('x');
                    const device = mysql.escape(user.device);
                    const queryStringToUserDeviceInfo = 'INSERT INTO user_sign_info (ow_profile_userid,ow_account_from,ow_account_last_login,ow_account_signup_time,ow_account_online_time,ow_account_devices) VALUES ('
                                                       + userid + ',' + signFrom + ',' + nowTimestamp + ',' + nowTimestamp + ',' + '0' + ',' + device + ')';
                    db.query(queryStringToUserDeviceInfo,function(err){
                        if(err) {
                            db.close();
                            return callback(err,USER_SIGNUP_STATUS.USER_SIGN_FAIL);
                        }
                        return callback(null,USER_SIGNUP_STATUS.USER_LOGIN_SUCCESS);
                    });
                    
                })
            });
        }
    });

    
}

module.exports = Users;