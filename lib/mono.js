/**
 * Created by wangzhilong on 2017/9/27.
 */
const Mongolass = require('mongolass');
const mongolass = new Mongolass();
const uuidv1 = require('uuid/v1');
const marked = require('marked');

exports.User = mongolass.model('User', {
  name: { type: 'string' },
  password: { type: 'string' },
  avatar: { type: 'string' },
  gender: { type: 'string', enum: ['m', 'f', 'x'] },
  bio: { type: 'string' }
});

// 先查询叫这个名字的用户有没有, 有的话就抛出异常
// 没有的话可以正常执行入库
// MongoDB 只适合存储数据,不适合做关系约束
exports.createUser = function (username, password) {
  return this.User.find({name: username})
    .exec()
    .then(result => {
      if (result && result.length > 0) {
        throw new Error('user exists')
      } else {
        return this.User.insertOne({
          name: username,
          password: password
        })
          .exec()
      }
    })
};

exports.loginUser = function (username, password) {
  return this.User.findOne({name: username})
    .exec()
    .then(result => {
      if (result.password == password) {
        return Promise.resolve(result._id)
      } else {
        throw new Error('bad password')
      }
    })
};

exports.Post = mongolass.model('Post', {
  title: { type: 'string' },
  rawContent: { type: 'string' }, //markdown string
  content: { type: 'string' },  //html string
  author: { type: Mongolass.Types.ObjectId },
  createdAt: { type: 'number' }
});

exports.createPost = function (title, content, userid) {
  var rendered = marked(content);
  var date = new Date().getTime()
  return this.Post.insertOne({
    title: title,
    rawContent: content,
    content: rendered,
    author: userid,
    createdAt: date
  })
    .exec()
}

exports.updatePost = function (postid, title, content) {
  var data = {}
  if (title) {
    data['title'] = title
  }
  if (content) {
    var rendered = marked(content)
    data['content'] = rendered
    data['rawContent'] = content
  }
  return this.Post.update({_id: postid}, { $set: data})
    .exec()
}

exports.deletePost = function (postid) {
  return this.Post.remove({_id: postid})
    .exec()
}

exports.queryPost = function (page, limit) {
  // skip 和 limit 在这个数据库驱动里面貌似没用，后面换个依赖
  // 分页先不做了
  return this.Post.find()
    // .skip(page * limit)
    // .limit(limit)
    .sort({ createdAt: -1 })
    .exec()
}

exports.Session = mongolass.model('Session', {
  token: { type: 'string'},
  expires: { type: 'number' },
  user: { type: Mongolass.Types.ObjectId }
});

exports.createSession = function (id) {
  var t = uuidv1();
  expires = new Date().getTime() + 90000000
  return this.Session.insertOne({
    token: t,
    expires: expires,
    user: id
  })
    .exec()
    .then(() => {
      return Promise.resolve(t)
    })
};

exports.querySession = function (token) {
  return this.Session.findOne({token: token})
    .exec()
    .then(result => {
      if (!result || result == undefined) {
        return Promise.reject(new Error('invalid session token'))
      }
      let current = new Date().getTime()
      if (current < result.expires) {
        return Promise.resolve(result.user)
      } else {
        return Promise.reject(new Error('session expires'))
      }
    })
}