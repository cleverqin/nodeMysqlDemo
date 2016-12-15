var express = require('express')           //express框架引入
var app = express();                       //实例
var bodyParser = require('body-parser');
var ejs = require('ejs');
var cookieParser = require('cookie-parser')
var session = require('express-session')

app.use(bodyParser());
app.use(cookieParser())
app.use(session({
    secret: 'clever'
}))

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views','./app/views')                 //模板位置
app.engine('.html', ejs.__express);
app.set('view engine', 'html');            //模板引擎

require('./routes/routes')(app);
if ('development' === app.get('env')) {
    app.set('showStackError', true);
    app.locals.pretty = true;
}
app.listen(3000);
console.log("sever at 3000");