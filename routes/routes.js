var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var multer  = require('multer');
var upload = multer({ dest: 'public/static/images' });
var fs = require("fs");
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
        //接收前台POST过来的base64
        var imgData = req.body.imgData;
        var basePath="./public/static/images/";
        var storePath=new Date().getTime()+".png";
        //过滤data:URL
        var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = new Buffer(base64Data, 'base64');
        fs.writeFile( basePath+storePath, dataBuffer, function(err) {
            if(err){
                var response={
                    status:0,
                    msg:"图片保存失败",
                    err:err
                }
            }else{
                response={
                    status:1,
                    msg:"图片保存成功",
                    fileName:storePath
                }
            }
            res.json(response);
        });
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
}
