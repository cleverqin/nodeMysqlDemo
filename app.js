var express = require('express')           //express框架引入
var app = express();                       //实例
var bodyParser = require('body-parser');
var ejs = require('ejs');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views','./app/views')                 //模板位置
app.engine('.html', ejs.__express);
app.set('view engine', 'html');            //模板引擎
require('./routes/routes')(app);
app.listen(3000);
console.log("sever at 3000");