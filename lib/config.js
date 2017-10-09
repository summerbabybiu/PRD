
exports.appId = 'summerbaby';

exports.masterKey = 'summerbaby';

exports.serverURL = 'http://localhost:3000/parse';

exports.sessionMaxAge = 9000000000;

var env = process.env.NODE_ENV;
if (env == "prod") {
  exports.databaseURI = 'mongodb://MONGODB_URI/parse';
} else {
  exports.databaseURI = 'mongodb://localhost:27017/parse';
}