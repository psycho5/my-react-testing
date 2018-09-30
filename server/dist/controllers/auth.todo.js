'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.login = exports.me = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _auth = require('../utils/auth');

var _db = require('../utils/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authUserToJSON = user => _extends({}, (0, _auth.userToJSON)(user), {
  token: (0, _auth.getUserToken)(user)
});

async function register(req, res) {
  const { username, password } = req.body;
  if (!username) {
    return res.status(422).json({ errors: { username: `can't be blank` } });
  }

  if (!password) {
    return res.status(422).json({ errors: { password: `can't be blank` } });
  }
  const existingUser = (await _db2.default.getUsers(u => u.username === username))[0];
  if (existingUser) {
    return res.status(422).json({ errors: { username: 'taken' } });
  }
  const newUser = await _db2.default.insertUser(_extends({
    username
  }, (0, _auth.getSaltAndHash)(password)));
  return res.json({ user: authUserToJSON(newUser) });
}

async function login(req, res, next) {
  if (!req.body.username) {
    return res.status(422).json({ errors: { username: `can't be blank` } });
  }

  if (!req.body.password) {
    return res.status(422).json({ errors: { password: `can't be blank` } });
  }
  const { user, info } = await authenticate(req, res, next);

  if (user) {
    return res.json({ user: authUserToJSON(user) });
  } else {
    return res.status(422).json(info);
  }
}

function authenticate(req, res, next) {
  return new Promise((resolve, reject) => {
    _passport2.default.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        reject(err);
      } else {
        resolve({ user, info });
      }
    })(req, res, next);
  });
}

async function me(req, res) {
  if (req.user) {
    // 👋 there's a bug here 😉
    // there's a handy utility method in this file
    // you might like called `authUserToJSON`
    return res.json({ user: req.user });
  } else {
    return res.status(404).send();
  }
}

exports.me = me;
exports.login = login;
exports.register = register;