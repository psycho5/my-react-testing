'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _auth = require('../utils/auth');

var _auth2 = require('../controllers/auth');

var authController = _interopRequireWildcard(_auth2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function setupAuthRoutes(router) {
  router.post('/register', authController.register);
  router.post('/login', authController.login);
  router.get('/me', _auth.authMiddleware.required, authController.me);
}

exports.default = setupAuthRoutes;