'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? (0, _immutable.Map)({ posts: null, comments: null }) : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? { type: null } : arguments[1];

  console.log('***** Posts Reducer action ' + action.type);
  if (action.type == 'TOGGLE_EDIT') {
    console.log('++++++++++ 3. store takes toggle_edit and passes it to its reducers');
  }
  switch (action.type) {
    case 'SET_STATE':
      state = state.merge({ posts: action.state.posts, comments: action.state.comments });

      return state;
    case 'UPDATE_CLIENT_POST':
      state = state.setIn(['currentPost', 'body'], action.postText);
      return state;
    case 'CLEAR_CLIENT_POST':
      state = state.delete('clientPost');

      return state;
    case 'TOGGLE_EDIT':
      console.log('++++++++++ 4. reducer handles toggle_edit and mutates the state');
      state = state.set('postEdit', !state.get('postEdit'));
      return state;
    case 'SET_EDIT':
      state = state.set('postEdit', action.edit);
      return state;
    case 'UPDATE_CLIENT_COMMENT':
      state = updateClientComment(state, action.comment);
      return state;
    case 'CLEAR_CLIENT_COMMENT':
      state = state.delete('clientComment');
      return state;

    case 'SET_POSTS':
      state = state.set('posts', action.posts);

      return state;
    case 'SET_CURRENT_POST':
      state = state.set('currentPost', action.post);
      return state;
    case 'SET_COMMENTS':
      state = state.set('comments', action.comments);
      return state;
    case 'ADD_TO_COMMENTS':
      var comments = state.get('comments');
      if (comments && action.comment) {
        state = state.set('comments', comments.push(action.comment));
      }
      return state;
    case 'SET_CURRENT_COMMENT':
      state = state.set('currentComment', action.comment);
      return state;
    case 'GET_POSTS':
      state = state.set('posts', action.posts);

      return state;
      return state;
    default:
      return state;
  }
};

var _utils = require('../utils');

var _immutable = require('immutable');

function setCurrentPost(state, post) {
  console.log('setCurrentPost :' + JSON.stringify(post));
  state = state.set('currentPost', post);
  return state;
}

function setComments(state, comments) {
  console.log('setCurrentComment :' + JSON.stringify(comments));
  state = state.set('comments', comments);
  return state;
}

function setCurrentComment(state, comment) {
  console.log('setCurrentComment :' + JSON.stringify(comment));
  state = state.set('currentComment', comment);
  return state;
}

function updateClientComment(state, comment) {
  return state.set('clientComment', comment);
}

function updateClientPost(state, postText, postId) {
  var post = _utils.utils.getItem(state, 'posts', postId);
  post = post.set('body');
  var posts = _utils.utils.updateItem(state.get('posts'), post, postId);
  state = state.set('posts', posts);
  return state;
}