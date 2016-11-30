var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
module.exports = function(app) {
    // Index
    app.get('/', Index.index);
    // user
    app.get('/register', User.register);
    app.get('/login', User.login);
    app.post('/userRegister',User.userRegister);
    app.post('/userLogin',User.userLogin);
    app.post('/userValid',User.userValid);
    app.post('/delUser',User.delUser);
    app.post('/userUpdate',User.userUpdate);
    app.get('/user/list', User.userList);
    app.get('/userDetail/:id', User.detail);
}
