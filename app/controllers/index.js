var trendsDao = require('../dao/trendsDao');
exports.index = function(req, res) {
    trendsDao.allTrends(function (relust) {
        if(relust){
            relust.forEach(function (item,index) {
                if(item.pic_list){
                    item.pic_list=item.pic_list.split(',');
                }
            })
            console.log(relust)
            res.render('index', {
                title: '首页',
                trends:relust
            })
        }else {
            res.render('index', {
                title: '首页'
            })
        }
    })
}