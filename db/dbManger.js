var mysql = require('mysql');

var config = {
    host: '121.42.163.107',
    user: 'goofyy',
    password: 'goofyyPassword',
    port: '3306',
    database: 'oneWord',
};

function initializeConnection(config) {
    function addDisconnectHandler(connection) {
        connection.on("error", function (error) {
            if (error instanceof Error) {
                if (error.code === "PROTOCOL_CONNECTION_LOST") {
                    console.error(error.stack);
                    console.log("Lost connection. Reconnecting...");

                    initializeConnection(connection.config);
                } else if (error.fatal) {
                    throw error;
                }
            }
        });
    }

    var connection = mysql.createConnection(config);
    addDisconnectHandler(connection);
    return connection;
}
var DBManger = {
    //连接到数据库
    open: function (callback) {
        var connection = initializeConnection(config);
        connection.connect(function (error) {
            if (error) {
                return callback(error);
            }
            console.log('连接数据库成功');
        });
    },

    //执行sql语句
    query: function (queryString, callback) {
        var connection = initializeConnection(config);
        connection.query(queryString, function (error, rows, fields) {
            if (error) {
                return callback(error);
            }
            console.log(queryString + "操作数据库成功");
            return callback(error, rows, fields);
        });
    },

    update : function (updateString,updateParams,callback) {
        var connection = initializeConnection(config);
        connection.query(updateString,updateParams, function (error, rows, fields) {
            if (error) {
                return callback(error);
            }
            console.log(updateString + "操作数据库成功");
            return callback(error, rows, fields);
        });
    },

    //关闭数据库
    close: function () {
        var connection = initializeConnection(config);
        connection.end(function (error) {
            if (!error) {
                console.log('关闭连接数据库成功');
            }
        });
    }
};


module.exports = DBManger;