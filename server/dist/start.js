'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

require('express-async-errors');

var _detectPort = require('detect-port');

var _detectPort2 = _interopRequireDefault(_detectPort);

var _auth = require('./utils/auth');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function startServer({ port = process.env.SERVER_PORT } = {}) {
  port = port || (await (0, _detectPort2.default)(8888));
  const app = (0, _express2.default)();
  app.use((0, _cors2.default)());
  app.use(_bodyParser2.default.json());
  app.use(_passport2.default.initialize());
  _passport2.default.use((0, _auth.getLocalStrategy)());

  (0, _routes2.default)(app);

  return new Promise(resolve => {
    const server = app.listen(port, () => {
      _loglevel2.default.info(`Listening on port ${server.address().port}`);
      const originalClose = server.close.bind(server);
      server.close = () => {
        return new Promise(resolveClose => {
          originalClose(resolveClose);
        });
      };
      resolve(server);
    });
  });
}

exports.default = startServer;