'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createJSON = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function createJSON(data) {
  const response = await _axios2.default.post('https://api.myjson.com/bins', data);
  return response.data;
}

exports.createJSON = createJSON;