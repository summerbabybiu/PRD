/**
 * Created by wangzhilong on 2017/9/26.
 */
var express = require('express');
var router = express.Router();
var URL = require('url');

router.get('/', function (req, res) {
  res.render('admin', {
    title: 'summerbaby\'s 后台'
  });
});

router.get('/userLogin', function (req, res) {
  console.log(111);
  res.send('qqqq');
});
module.exports = router;