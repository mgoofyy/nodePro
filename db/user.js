var db = require('./dbManger');
var mysql = require('mysql');

var Users = new Function();

Users.prototype.signupSave = function(user,callback) {
    db.open(function(error){
        if(error) {
            console.log('连接数据库出错' + error);
            return;
        }
    });

    //查询数据库 查询某个手机号是否注册过
    var searchString = 'SELECT * FROM user WHERE ow_profile_phone =' + mysql.escape(user.phone);
    db.query(searchString,function(err,result){
        if(err) {
            return callback(err);
        }

        if(result.length !== 0) {
            return callback(new Error('已经注册'),result);
        } else {
            var queryString = 'INSERT INTO user (ow_profile_phone,ow_profile_password) VALUES (' + mysql.escape(user.phone)+ ',' + mysql.escape(user.password) + ')';
            console.log(queryString);
            db.query(queryString,function(err){
                console.log(err);
                db.close();
                if(err) {
                    return callback(err);
                }
                return callback(null); 
            });
        }
    });

    
}

module.exports = Users;