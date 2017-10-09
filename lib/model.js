const Parse = require('parse/node');
const config = require('./config');
const marked = require('marked');
Parse.initialize(config.appId);
Parse.serverURL = config.serverURL;
Parse.User.enableUnsafeCurrentUser();

const User = Parse.User
exports.User = User;

exports.createUser = function (username, password) {
  var user = new Parse.User();
  user.set('username', username);
  user.set('password', password);
  return user.signUp();
}

exports.loginUser = function (username, password) {
  return Parse.User.logIn(username, password);
}

const Post = Parse.Object.extend('Post');
exports.Post = Post;

exports.createPost = function (title, content, user) {
  var rendered = marked(content);
  var post = new this.Post;
  post.set('title', title);
  post.set('rawContent', content);
  post.set('content', rendered);
  post.set('author', user);
  return post.save();
}

exports.updatePost = function (postid, title, content) {
  var query = new Parse.Query(Post);
  return query.get(postid)
  .then(p => {
    var rendered = marked(content);
    p.set('title', title);
    p.set('rawContent', content);
    p.set('content', rendered);
    return p.save();
  })
}

//有个 bug，重复删除同一个 id 的 post 会得不到响应，避免这样调用
exports.deletePost = function (postid) {
  var query = new Parse.Query(Post);
  return query.get(postid)
  .then(p => {
    console.log(postid);
    return p.destroy();
  })
}

exports.queryPost = function (page, limit) {
  var query = new Parse.Query(Post);
  query.limit(limit);
  query.skip((page - 1) * limit);
  query.descending('createdAt');
  return query.find();
}