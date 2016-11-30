var userDao = require('../dao/userDao');
// signup
exports.register = function(req, res) {
    res.render('register', {
        title: '注册页面'
    })
}
exports.userRegister = function(req, res) {
    var user = req.body;
    userDao.add(user,function (result) {
        if(result){
            res.redirect('/user/list');
        }else {
            res.redirect('/');
        }
    })

}
exports.login = function(req, res) {
    res.render('login', {
        title: '登录页面'
    })
}
exports.userLogin = function(req, res) {
    var user=req.body;
    console.log(user);
    res.json({
        msg: '登录成功'
    })
}
exports.userList = function(req, res) {
    userDao.queryAll(function (results) {
        res.render('userList', {
            title: '用户列表',
            users:results
        })
    });
}
exports.userValid = function(req, res) {
    var name= req.body.name;
    userDao.queryByName(name,function (results) {
        if(results.length>0&&results){
            res.json({
                valid: false
            })
        }else {
            res.json({
                valid: true
            })
        }
    });
}
exports.delUser = function(req, res) {
    var userID= req.body.userID;
    userDao.delete(userID,function (results) {
        res.json(results)
    });
}
exports.detail = function(req, res) {
    var userID= req.params.id;
    userDao.queryByID(userID,function (results) {
        res.render('userDetail', {
            title: '用户详情',
            user:results[0]
        })
    });
}
exports.userUpdate = function(req, res) {
    var user= req.body;
    userDao.update(user,function (results) {
        if(results){
            res.redirect('/user/list');
        }else {
            res.redirect('/');
        }
    });
}
