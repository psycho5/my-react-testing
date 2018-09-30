'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGist = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function createGist(data) {
  const response = await _axios2.default.post('https://api.github.com/gists', data);
  return response.data;
}

exports.createGist = createGist;