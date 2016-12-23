var mysql = require('mysql');
var $sql = require('./userSqlMapping');
var $conf = require('../mysqlDB/db');

// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);

module.exports = {
    add: function (user,callback) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.insert, [user.name, user.password,user.nickName], function(err, result) {
                callback(result);
                // 释放连接
                connection.release();
            });
        });
    },
    delete: function (userId,callback) {
        // delete by Id
        pool.getConnection(function(err, connection) {
            connection.query($sql.delete, userId, function(err, result) {
                if(result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg:'删除成功'
                    };
                    callback(result)
                } else {
                    result = {
                        code:500,
                        msg:"删除失败"
                    }
                    callback(result)
                }
                connection.release();
            });
        });
    },
    update: function (user,callback) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.update, [user.password,user.nickName,user.userID], function(err, result) {
                callback(result);
                connection.release();
            });
        });

    },
    updateUserPic: function (user,callback) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.updateUserPic, [user.userPic,user.userID], function(err, result) {
                callback(result);
                connection.release();
            });
        });

    },
    queryByName: function (name,callback) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryByName, name, function(err, result) {
                callback(result);
                connection.release();

            });
        });
    },
    queryByID: function (id,callback) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryByID, id, function(err, result) {
                callback(result);
                connection.release();

            });
        });
    },
    queryAll: function (callback) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, result) {
                callback(result);
                connection.release();
            });
        });
    }

};