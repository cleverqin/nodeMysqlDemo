var mysql = require('mysql');
var $sql = require('./trendsSqlMapping');
var $conf = require('../mysqlDB/db');
var util=require('../util/util')
// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);
module.exports={
    add:function (trends,callback) {
        var picList=trends.picList;
        pool.getConnection(function (err,connection) {
            console.log(picList);
            connection.query($sql.insert,[trends.userID,trends.contentTxt,new Date().Format("yyyy-MM-dd hh:mm:ss"),picList],function (err,result) {
                if(err){
                    console.log(err)
                }
                callback(result);
                // 释放连接
                connection.release();
            })
        })
    },
    allTrends:function (callback) {
        pool.getConnection(function (err,connection) {
            connection.query($sql.queryAll,[],function (err,result) {
                if(err){
                    console.log(err)
                }
                callback(result);
                // 释放连接
                connection.release();
            })
        })
    }
}
