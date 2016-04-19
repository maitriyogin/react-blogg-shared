'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? (0, _immutable.Map)({ users: null }) : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? { type: null } : arguments[1];

  console.log('***** Users Reducer action ' + action.type);
  switch (action.type) {
    case 'SET_STATE':
      state = state.merge({ users: action.state.users });

      return state;
    case 'SET_USERS':
      state = state.set('users', action.users);
      return state;
    case 'ADD_TO_USERS':
      var users = state.get('users');
      if (users && action.user) {
        state = state.set('users', users.push(action.user));
      }
      return state;
    case 'CLEAR_VIEW_USER':
      state = state.delete('newUser');
      return state;
    case 'UPDATE_VIEW_USER':
      state = updateUser(state, action.user);
      return state;
    case 'NEW_USER':
      state = newUser(state);
      return state;
    case 'NEW_LOGIN_USER':
      state = newLoginUser(state);
      return state;
    default:
      return state;
  }
};

var _immutable = require('immutable');

var _utils = require('../utils');

function newUser(state) {
  var user = (0, _immutable.Map)({
    username: '',
    email: '',
    posts: _immutable.List.of(),
    comments: _immutable.List.of()
  });
  return state.set('newUser', user);
}

function updateUser(state, mutUser) {
  var user = state.get('newUser');
  if (mutUser.username != null) {
    user = user.set('username', mutUser.username);
  }
  if (mutUser.email != null) {
    user = user.set('email', mutUser.email);
  }
  return state.set('newUser', user);
}