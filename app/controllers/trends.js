var trendsDao = require('../dao/trendsDao');
exports.addTrends=function (req,res) {
    console.log(req.body);
    var trends={
        userID:req.body.userID,
        contentTxt:req.body.contentTxt,
        picList:req.body.picList
    };
    console.log(trends);
    trendsDao.add(trends,function (result) {
        if(result){
            res.json({
                status:100,
                msg:"发表成功"
            })
        }else {
            res.json({
                status:101,
                msg:"发表失败"
            })
        }
    })
}