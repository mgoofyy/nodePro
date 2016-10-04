var mysql = require('mysql');

var connection = mysql.createConnection({
        host : '127.0.0.1',
        user : 'root',
        password : 'mysql',
        port : '3306',
        database: 'oneWord',
    });

var DBManger = {

    //连接到数据库
    open:function(callback) {
        connection.connect(function(error){
            if(error) {
                callback(error);
                return;
            }
        console.log('连接数据库成功');
        });
    },

    //执行sql语句
    query : function(queryString,callback) {
        connection.query(queryString,function(error,rows,fields){
            if(error){
                callback(error);
                return;
            }
            console.log(queryString + "操作数据库成功");
        });
    },

    //关闭数据库
    close:function(callback) {
        connection.end(function(error){
            if(error) {
                callback(error);
                return;
            }
        console.log('关闭连接数据库成功');
        });
    }
};


module.exports = DBManger;