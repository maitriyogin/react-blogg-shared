'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _posts = require('./posts');

Object.defineProperty(exports, 'posts', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_posts).default;
  }
});

var _users = require('./users');

Object.defineProperty(exports, 'users', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_users).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }