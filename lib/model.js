const Parse = require('parse/node');
const config = require('./config');
Parse.initialize(config.appId);
Parse.serverURL = config.serverURL;

exports.User = Parse.User;

exports.createUser = function (username, password) {
  var user = new Parse.User();
  user.set('username', username);
  user.set('password', password);
  return user.signUp();
}

exports.loginUser = function (username, password) {
  return Parse.User.logIn(username, password);
}