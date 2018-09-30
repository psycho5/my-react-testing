'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePost = exports.updatePost = exports.createPost = exports.getPost = exports.getPosts = exports.authorize = undefined;

var _db = require('../utils/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function authorize(req, res, next) {
  const { authorId } = await _db2.default.getPost(req.params.id);
  if (req.user.id === authorId) {
    return next();
  } else {
    return res.status(403).send();
  }
}

async function getPosts(req, res) {
  const posts = await _db2.default.getPosts();
  if (posts) {
    return res.json({ posts });
  } else {
    return res.status(404).send();
  }
}

async function getPost(req, res) {
  const post = await _db2.default.getPost(req.params.id);
  if (post) {
    return res.json({ post });
  } else {
    return res.status(404).send();
  }
}

async function createPost(req, res) {
  const post = await _db2.default.insertPost(req.body);
  if (post) {
    return res.json({ post });
  } else {
    return res.status(404).send();
  }
}

async function updatePost(req, res) {
  const post = await _db2.default.getPost(req.params.id);
  if (!post) {
    return res.status(404).send();
  }
  if (!req.user || req.user.id !== post.authorId) {
    return res.status(403).send();
  }
  const updatedPost = await _db2.default.updatePost(req.params.id, req.body);
  if (updatedPost) {
    return res.json({ post: updatedPost });
  } else {
    // TODO: come up with a better status code...
    return res.status(500).send();
  }
}

async function deletePost(req, res) {
  const post = await _db2.default.getPost(req.params.id);
  if (!post) {
    return res.status(404).send();
  }
  if (!req.user || req.user.id !== post.authorId) {
    return res.status(403).send();
  }
  const deletedPost = await _db2.default.deletePost(req.params.id);
  return res.json({ post: deletedPost });
}

exports.authorize = authorize;
exports.getPosts = getPosts;
exports.getPost = getPost;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;