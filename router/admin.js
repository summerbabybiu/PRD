/**
 * Created by wangzhilong on 2017/9/26.
 */
var express = require('express');
var router = express.Router();
var URL = require('url');
var util = require('../lib/utils');
const model = require('../lib/model');
const config = require('../lib/config');
const middleware = require('../middleware');

router.get('/', function (req, res) { //展示登录界面
  res.render('admin', {
    title: 'summerbaby\'s 后台'
  });
});

router.get('/signUp', function (req, res) { //展示注册界面
  res.render('singUp', {
    title: 'summerbaby\'s 后台 注册'
  });
});


router.post('/signup', (req, res) => {
  // req.body.username 因为用了 body-parser 才能获取到
  let user = req.body.username;
  let password = req.body.password;
  if (!util.paramValidator(user) || !util.paramValidator(password)) {
    //参数有空的或者缺少的直接 400 (bad request)
    return res.status(400).send('invalid parameter')
  }
  model.createUser(user, password)
  .then(user => {
    res.send(user);
  })
  .catch(e => {
    res.status(e.code).send(e.message);
  })
});

router.post('/signin', (req, res) => {
  let user = req.body.username;
  let password = req.body.password;
  console.log(req.body);
  if (!util.paramValidator(user) || !util.paramValidator(password)) {
    //参数有空的或者缺少的直接 400 (bad request)
    return res.status(400).send('invalid parameter')
  }
  model.loginUser(user, password)
  .then(user => {
    res.cookie('sessionToken', user.getSessionToken(), {'maxAge': config.sessionMaxAge});
    res.send(user);
  })
  .catch(e => {
    res.status(e.code).send(e.message);
  })
});

router.get('/user', middleware.requireLogin, (req, res) => {
  res.send(req.user);
});

module.exports = router;