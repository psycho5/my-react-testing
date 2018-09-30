'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _generate = require('til-shared/generate');

var generate = _interopRequireWildcard(_generate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const db = {
  users: [],
  posts: [],

  insertUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,

  insertPost,
  getPost,
  getPosts,
  updatePost,
  deletePost
};

async function insertUser(user) {
  const newUser = _extends({}, user, {
    id: generate.id()
  });
  db.users.push(newUser);
  return newUser;
}

async function getUsers(filter) {
  return filter ? db.users.filter(filter) : [...db.users];
}

async function getUser(id) {
  return (await getUsers(u => u.id === id))[0];
}

async function updateUser(id, newInfo) {
  const user = await getUser(id);
  // doing this to make a new copy of the user to avoid subtle bugs
  // that rely on mutation.
  const newUserWithUpdates = Object.assign({}, user, newInfo);
  db.users[db.users.indexOf(user)] = newUserWithUpdates;
  return newUserWithUpdates;
}

async function deleteUser(id) {
  const user = await getUser(id);
  db.users = db.users.filter(u => u.id !== id);
  return user;
}

async function insertPost(post) {
  const newPost = _extends({}, post, {
    id: generate.id()
  });
  db.posts.push(newPost);
  return newPost;
}

async function getPosts(filter) {
  return filter ? db.posts.filter(filter) : [...db.posts];
}

async function getPost(id) {
  return (await getPosts(t => t.id === id))[0];
}

async function updatePost(id, newInfo) {
  const post = await getPost(id);
  // doing this to make a new copy of the user to avoid subtle bugs
  // that rely on mutation.
  const newPostWithUpdates = Object.assign({}, post, newInfo);
  db.posts[db.posts.indexOf(post)] = newPostWithUpdates;
  return newPostWithUpdates;
}

async function deletePost(id) {
  const post = await getPost(id);
  db.posts = db.posts.filter(t => t.id !== id);
  return post;
}

exports.default = db;