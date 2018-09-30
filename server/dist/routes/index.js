'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _posts = require('./posts');

var _posts2 = _interopRequireDefault(_posts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setupRoutes(app) {
  const authRouter = _express2.default.Router();
  (0, _auth2.default)(authRouter);
  app.use('/api/auth', authRouter);

  const userRouter = _express2.default.Router();
  (0, _users2.default)(userRouter);
  app.use('/api/users', userRouter);

  const postRouter = _express2.default.Router();
  (0, _posts2.default)(postRouter);
  app.use('/api/posts', postRouter);
}

exports.default = setupRoutes;