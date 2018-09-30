'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPasswordAllowed = exports.getUserToken = exports.getLocalStrategy = exports.userToJSON = exports.getSaltAndHash = exports.authMiddleware = undefined;

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _lodash = require('lodash');

var _auth = require('til-shared/auth');

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authMiddleware = {
  required: (0, _expressJwt2.default)({
    secret: _auth.secret
  }),
  optional: (0, _expressJwt2.default)({
    secret: _auth.secret,
    credentialsRequired: false
  })
};

function getLocalStrategy() {
  return new _passportLocal2.default(async (username, password, done) => {
    let user;
    try {
      user = (await _db2.default.getUsers(u => u.username === username))[0];
    } catch (error) {
      return done(error);
    }
    if (!user || !(0, _auth.isPasswordValid)(password, user)) {
      return done(null, false, {
        errors: { 'username or password': 'is invalid' }
      });
    }
    return done(null, userToJSON(user));
  });
}

function userToJSON(user) {
  return (0, _lodash.omit)(user, ['exp', 'iat', 'hash', 'salt']);
}

function isPasswordAllowed(password) {
  return password.length > 6 && /\d/.test(password) && /\D/.test(password);
}

exports.authMiddleware = authMiddleware;
exports.getSaltAndHash = _auth.getSaltAndHash;
exports.userToJSON = userToJSON;
exports.getLocalStrategy = getLocalStrategy;
exports.getUserToken = _auth.getUserToken;
exports.isPasswordAllowed = isPasswordAllowed;