var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
module.exports = function(app) {
    // pre handle user
    app.use(function(req, res, next) {
        var _user = req.session.user;
        app.locals.user = _user;

        next()
    })
    // Index
    app.get('/', Index.index);
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
}
