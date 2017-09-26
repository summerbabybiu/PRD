/**
 * Created by wangzhilong on 2017/9/26.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('admin', {
    title: 'summerbaby\'s 后台'
  });
});

module.exports = router;