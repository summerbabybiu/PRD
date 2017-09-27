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
var path = require('path');

const Mongolass = require('mongolass');
const mongolass = new Mongolass();
mongolass.connect('mongodb://localhost:27017/bolg');// const mongolass = new Mongolass('mongodb://localhost:27017/test');


app.set('views', path.join(__dirname, 'views'));// 设置存放模板文件的目录
app.set('view engine', 'ejs');// 设置模板引擎为 ejs
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.send('hello summerbaby');
});

app.use('/about', aboutRouter);

app.get('/article', function (req, res) {
  res.send('article-detail');
});

app.use('/admin', adminRouter); //后台页面

app.listen(3000, function () {
  console.log('Server running at http://127.0.0.1:3000');
});
