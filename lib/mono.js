/**
 * Created by wangzhilong on 2017/9/27.
 */
const Mongolass = require('mongolass');
const mongolass = new Mongolass();
const uuidv1 = require('uuid/v1');

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
      if (result.pwd == password) {
        return Promise.resolve(result._id)
      } else {
        throw new Error('bad password')
      }
    })
};

exports.Post = mongolass.model('Post', {
  title: { type: 'string' },
  rawContent: { type: 'string' },
  content: { type: 'string' },
  author: { type: Mongolass.Types.ObjectId }
});

exports.Session = mongolass.model('Session', {
  token: { type: 'string'},
  expires: { type: 'number' },
  user: { type: Mongolass.Types.ObjectId }
});

exports.createSession = function (id) {
  var t = uuidv1();
  expires = new Date().getTime() + 900000
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