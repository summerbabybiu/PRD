/**
 * Created by wangzhilong on 2017/9/27.
 */
const router = require('express').Router(),
      utils = require('../lib/utils'),
      loginRequire = require('../middleware').requireLogin,
      pagination = require('../middleware').pagination,
      model = require('../lib/model');

router.get('/list', pagination, (req, res) => {
  model.queryPost(req.query.page, req.query.limit)
    .then(results => {
      res.send(results)
    })
    .catch(e => {
      res.status(e.code).send(e.message)
    })
});

// TODO: 创建文章要求登录，从cookie取 userid写成了中间件，去看一下就可以了
// @param: title 文章标题
// @param: content  markdown格式的文章内容
router.post('/create', loginRequire, (req, res) => {
  let title = req.body.title
  let content = req.body.content
  if (!utils.paramValidator(title) || !utils.paramValidator(content)) {
    return res.status(400).send('missing parameter')
  }
  model.createPost(title, content, req.user)
  .then(p => {
    res.send(p);
  })
  .catch(e => {
    res.status(e.code).send(e.message);
  })
});

// TODO: 更新文章只允许更新 title 和 content
// @param: postid 文章id
// @param: title 文章标题 可选
// @param: content 文章内容 可选
// title 和 content 至少传一个
router.post('/update', loginRequire, (req, res) => {
  let title = req.body.title
  let content = req.body.content
  let postid = req.body.postid
  if (!utils.paramValidator(postid)) {
    return res.status(400).send('missing postid')
  }
  if (!utils.paramValidator(title) && !utils.paramValidator(content)) {
    return res.status(400).send('missing title or content')
  }
  model.updatePost(postid, title, content)
  .then(p => {
    res.send(p);
  })
  .catch(e => {
    res.status(e.code).send(e.message);
  })
})

// TODO: 删除文章只需要传文章 id
router.post('/delete', loginRequire, (req, res) => {
  let postid = req.body.postid
  if (!utils.paramValidator(postid)) {
    return res.status(400).send('missing postid')
  }
  model.deletePost(postid)
  .then(success => {
    console.log(success);
    res.send(success);
  })
  .catch(e => {
    res.status(e.code).send(e.message);
  })
})

module.exports = router;