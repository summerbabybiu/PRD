/**
 * Created by wangzhilong on 2017/9/26.
 */
var express = require('express');
var router = express.Router();
var URL = require('url');
var User = require('../public/lib/mono');

router.get('/', function (req, res) { //展示登录界面
  res.render('admin', {
    title: 'summerbaby\'s 后台'
  });
});

router.get('/singUp', function (req, res) { //展示注册界面
  res.render('singUp', {
    title: 'summerbaby\'s 后台 注册'
  });
});

router.get('/userSingIn', function (req, res) { //登录 接口
  var params = URL.parse(req.url, true).query;
  if(!params.name) {//name is null
    res.send({status: -2, msg: 'name can\'t be null', data: {}});
  } else {
    if(!params.pwd) { //pwd is null
      res.send({status: -3, msg: 'pwd can\'t be null', data: {}});
    } else {
      // User
      //   .insertOne(params)
      //   .exec()
      //   .then(console.log,res.send({status: 0, msg: 'success', data: {}}))
      //   .catch(console.error,res.send({status: -1, msg: 'failed', data: {}}));
    }
  }
  // res.send(params);
});
module.exports = router;