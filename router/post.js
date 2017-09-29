/**
 * Created by wangzhilong on 2017/9/27.
 */
const router = require('express').Router(),
      utils = require('../lib/utils'),
      loginRequire = require('../middleware').requireLogin,
      pagination = require('../middleware').pagination,
      mono = require('../lib/mono')

// TODO: 这个数据库驱动貌似不支持 skip等 API，所以分页先做个样子，实际一次查询是返回所有的
router.get('/list', pagination, (req, res) => {
  mono.queryPost(req.query.page, req.query.limit)
    .then(results => {
      res.send(results)
    })
    .catch(e => {
      res.status(500).send(e.message)
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
  mono.createPost(title, content, req.userid)
    .then(result => {
      var post = result.ops[0]
      res.send({
        id: post._id,
        title: title,
        content: post.content,
        createdAt: post.createdAt
      })
    })
    .catch(e => {
      res.status(500).send(e.message)
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
  mono.updatePost(postid, title, content)
    .then(result => {
      res.send('ok')
    })
    .catch(e => {
      res.status(500).send(e.message)
    })
})

// TODO: 删除文章只需要传文章 id
router.post('/delete', loginRequire, (req, res) => {
  let postid = req.body.postid
  if (!utils.paramValidator(postid)) {
    return res.status(400).send('missing postid')
  }
  mono.deletePost(postid)
    .then(result => {
      res.send('ok')
    })
    .catch(e => {
      res.status(500).send(e.message)
    })
})

module.exports = router;