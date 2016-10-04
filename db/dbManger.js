var mysql = require('mysql');

var connection = mysql.createConnection({
        host : '127.0.0.1',
        use : 'root',
        pass : 'mysql',
        port : '3306',
    });

var DBManger = {

    //连接到数据库
    open:function(callback) {
        connection.connect(function(error){
            !error ? nil : callback(error);
            return;
        });
    },

    //关闭数据库
    close:function(callback) {
        connection.end(function(error){
            !error ? nil : callback(error);
            return;
        });
    }
};


module.exports = DBManger;