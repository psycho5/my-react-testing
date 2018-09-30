'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _auth = require('../utils/auth');

var _users = require('../controllers/users');

var userController = _interopRequireWildcard(_users);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function setupUserRoutes(router) {
  router.get('/', userController.getUsers);

  router.get('/:id', _auth.authMiddleware.optional, userController.getUser);

  router.put('/:id', _auth.authMiddleware.required, userController.authorize, userController.updateUser);

  router.delete('/:id', _auth.authMiddleware.required, userController.authorize, userController.deleteUser);
}

exports.default = setupUserRoutes;