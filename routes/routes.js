var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Trends = require('../app/controllers/trends');
var multer  = require('multer');
var formidable=require('formidable');
var upload = multer({ dest: 'public/static/images' });
var fs = require("fs");
function formidableFormParse(req,callback){
    var obj ={};
    var form = new formidable.IncomingForm({
        encoding:"utf-8",
        uploadDir:"./public/static/images/",  //文件上传地址
        keepExtensions:true  //保留后缀
    });
    form.parse(req)
        .on('field', function(name, value) {  // 字段
            obj[name] = value;
        })
        .on('file', function(name, file) {  //文件
            obj[name] = file;
        })
        .on('error', function(error) {  //结束
            callback(error);
        })
        .on('end', function() {  //结束
            callback(null,obj);
        });
}
module.exports = function(app) {
    // pre handle user
    app.use(function(req, res, next) {
        var _user = req.session.user;
        app.locals.user = _user;
        next()
    })
    // Index
    app.get('/', Index.index);
    app.post('/imgUpload',function (req, res) {
        formidableFormParse(req,function (err,obj) {
            res.json({
                data:obj
            })
        })
    })
    // user
    app.get('/register', User.register);
    app.get('/login', User.login);
    app.post('/userRegister',User.userRegister);
    app.post('/userLogin',User.userLogin);
    app.get('/logOut',User.logout);
    app.post('/userValid',User.userValid);
    app.post('/delUser',User.delUser);
    app.post('/userUpdate',User.loginRequired,User.userUpdate);
    app.get('/user/list',User.loginRequired, User.userList);
    app.get('/userDetail/:id',User.loginRequired, User.detail);
    app.post('/updateUserPic',User.loginRequired,User.updateUserPic);
    app.get('/userCenter',User.loginRequired, User.userCenter);
    app.post('/addTrends',User.loginRequired,Trends.addTrends)
}
