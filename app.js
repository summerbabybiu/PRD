/**
 * Created by wangzhilong on 2017/9/26.
 */
// var http = require("http");
//
// http.createServer(function (request, response) {
//   response.writeHead("200", {'context-Type': 'text-plain'});
//   response.end('hello');
// }).listen(3000);


var express = require('express');
var app = express();
var aboutRouter = require('./router/about');
var adminRouter = require('./router/admin');
var postRouter = require('./router/post');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const middleware = require('./middleware');


const ParseServer = require('parse-server').ParseServer;
const config = require('./lib/config');

var parseApi = new ParseServer({
  databaseURI: config.databaseURI,
  appId: config.appId,
  masterKey: config.masterKey,
  serverURL: config.serverURL
})


app.set('views', path.join(__dirname, 'views'));// 设置存放模板文件的目录
app.set('view engine', 'ejs');// 设置模板引擎为 ejs
app.use(express.static(__dirname + '/public'));

// 使用中间件,协助处理一些事情

// 使用 body-parser, post请求的 body就能用 json的方式拿到了
app.use(bodyParser.json());  // 支持 application/json 格式的 body
app.use(bodyParser.urlencoded({ extended: true})); // 支持 application/x-www-form-urlencoded

// 使用 cookie parser, 所有请求的 cookie都可以用 json的方式拿到
app.use(cookieParser());
// 允许跨域访问api
app.use(middleware.CORS);
app.use(middleware.pathLogger);

app.get('/', function (req, res) {
  res.send('hello summerbaby');
});



app.use('/about', aboutRouter);

app.get('/article', function (req, res) {
  res.send('article-detail');
});

app.use('/post', postRouter);

app.use('/admin', adminRouter); //后台页面

app.use('/parse', parseApi);

app.listen(3000, function () {
  console.log('Server running at http://127.0.0.1:3000');
});
