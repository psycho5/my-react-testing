'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _auth = require('../utils/auth');

var _posts = require('../controllers/posts');

var postController = _interopRequireWildcard(_posts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function setupPostRoutes(router) {
  router.get('/', postController.getPosts);
  router.get('/:id', postController.getPost);
  router.post('/', _auth.authMiddleware.required, postController.createPost);

  router.put('/:id', _auth.authMiddleware.required, postController.authorize, postController.updatePost);

  router.delete('/:id', _auth.authMiddleware.required, postController.authorize, postController.deletePost);
}

exports.default = setupPostRoutes;