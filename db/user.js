var db = require('./dbManger');
var mysql = require('mysql');

var Users = new Function();

Users.prototype.save = function(user,callback) {
    db.open(function(error){
        if(error) {
            console.log('连接数据库出错' + error);
            return;
        }
    });
    console.log(user.nickname);
    var queryString = 'INSERT INTO user (ow_profile_nickname,ow_profile_place,ow_profile_age,ow_profile_sex,ow_profile_signature,ow_profile_phone,ow_profile_userType) VALUES (' + mysql.escape(this.nickname) + ',' + mysql.escape(this.place)+ ',' + mysql.escape(this.age)+ ',' + mysql.escape(this.sex)+ ',' + mysql.escape(this.signature)+ ',' + mysql.escape(this.phone)+ ',' + mysql.escape(this.userType) + ')';
    console.log(queryString);
    db.query(queryString,function(err){
        console.log(err);
        if(err) {
            db.close(function(err){

            });
            return;
        }
    });
}

module.exports = Users;