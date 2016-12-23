var userDao = require('../dao/userDao');
var bcrypt = require('bcrypt-nodejs');
// signup
exports.register = function(req, res) {
    res.render('register', {
        title: '注册页面'
    })
}
exports.userRegister = function(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
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
    userDao.queryByName(user.name,function (results) {
        if(!results.length>0&&results){
            res.json({
                status: 0,
                msg:"用户名不存在！"
            })
        }else {

            if(bcrypt.compareSync(user.password, results[0].password)){
                req.session.user = results[0];
                res.json({
                    status: 1,
                    msg:"登录成功！"
                })
            }else {
                res.json({
                    status: 0,
                    msg:"密码错误！"
                })
            }
        }
    });
}
// logout
exports.logout =  function(req, res) {
    delete req.session.user
    res.redirect('/')
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
    user.password = bcrypt.hashSync(user.password);
    userDao.update(user,function (results) {
        if(results){
            res.redirect('/user/list');
        }else {
            res.redirect('/');
        }
    });
}
exports.loginRequired = function(req, res, next) {
    var user = req.session.user;
    if (!user) {
        return res.redirect('/login')
    }
    next()
}
exports.updateUserPic = function(req, res) {
    var user = req.session.user;
    var userPic=req.body.userPic;
    user.userID=user.user_id;
    user.userPic=userPic;
    userDao.updateUserPic(user,function (results) {
        if(results){
            user.user_pic=userPic;
            req.session.user=user;
            var resJson={
                status:1,
                msg:"修改成功！"
            }
        }else {
            resJson={
                status:0,
                msg:"修改失败！"
            }
        }
        res.json(resJson)
    })
}
exports.userCenter = function(req, res) {
    var user = req.session.user;
    userDao.queryByID(user.user_id,function (results) {
        res.render('userCenter', {
            title: '个人中心',
            userInfo:results[0]
        })
    });
}