/**
 * Created by wangzhilong on 2017/9/26.
 */
var express = require('express');
var router = express.Router();
var URL = require('url');
var util = require('../lib/utils');
var mono = require('../lib/mono');

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
  mono.createUser(user, password)
    .then(u => {
      res.send({
        'id': u.insertedId,
      })
    })
    .catch(e => {
      res.status(500).send(e.message)
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
  mono.loginUser(user, password)
    .then(id => {
      return mono.createSession(id)
    })
    .then(token => {
      //设置cookie
      res.cookie('sessionToken', token, { maxAge: 900000, httpOnly: true })
      res.send('success')
    })
    .catch(e => {
      res.status(400).send(e.message)
    })
});

module.exports = router;