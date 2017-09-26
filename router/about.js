/**
 * Created by wangzhilong on 2017/9/26.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req,res) {
  res.send('about');
})

module.exports = router;
