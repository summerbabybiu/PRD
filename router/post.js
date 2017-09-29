/**
 * Created by wangzhilong on 2017/9/27.
 */
const router = require('express').Router(),
      utils = require('../lib/utils'),
      loginRequire = require('../middleware').requireLogin,
      pagination = require('../middleware').pagination,
      mono = require('../lib/mono')

router.get('/list', pagination, (req, res) => {
  mono.queryPost(req.query.page, req.query.limit)
    .then(results => {
      res.send(results)
    })
    .catch(e => {
      res.status(500).send(e.message)
    })
});

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