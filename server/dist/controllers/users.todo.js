'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authorize = exports.updateUser = exports.getUser = exports.getUsers = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _auth = require('../utils/auth');

var _db = require('../utils/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function authorize(req, res, next) {
  if (req.user.id === req.params.id) {
    return next();
  } else {
    return res.status(403).send();
  }
}

async function getUsers(req, res) {
  const users = await _db2.default.getUsers();
  if (users) {
    return res.json({ users: users.map(u => (0, _auth.userToJSON)(u)) });
  } else {
    return res.status(404).send();
  }
}

async function getUser(req, res) {
  const user = await _db2.default.getUser(req.params.id);
  if (user) {
    return res.json({
      user: _extends({}, (0, _auth.userToJSON)(user), {
        token: req.user && req.user.id === req.params.id ? (0, _auth.getUserToken)(user) : undefined
      })
    });
  } else {
    return res.status(404).send();
  }
}

async function updateUser(req, res) {
  if (!req.user || req.user.id !== req.params.id) {
    return res.status(403).send();
  }
  const user = await _db2.default.updateUser(req.params.id, req.body);
  if (user) {
    return res.json({ user: (0, _auth.userToJSON)(user) });
  } else {
    return res.status(404).send();
  }
}

// Here's where you'll add your deleteUser function!
// 1. If the req.user.id does not match the req.param.id then send a 403
// 2. Get the user from the DB. If that doesn't exist, send a 404
// 3. Delete the user
// 4. Send the user back (use userToJSON)
// Don't forget! It needs to be an async function, and you need to add it to the list of exports below.

exports.getUsers = getUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.authorize = authorize;