'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setState = setState;
exports.resetState = resetState;
exports.fetchPosts = fetchPosts;
exports.setPosts = setPosts;
exports.postsFetchFailure = postsFetchFailure;
exports.setCurrentPost = setCurrentPost;
exports.setComments = setComments;
exports.addToComments = addToComments;
exports.setCurrentComment = setCurrentComment;
exports.updateClientPost = updateClientPost;
exports.toggleEdit = toggleEdit;
exports.setPostEdit = setPostEdit;
exports.clearClientPost = clearClientPost;
exports.getPosts = getPosts;
exports.getPost = getPost;
exports.updatePost = updatePost;
exports.getCommentsForPost = getCommentsForPost;
exports.updateClientComment = updateClientComment;
exports.clearClientComment = clearClientComment;
exports.addComment = addComment;
exports.getUsers = getUsers;
exports.createUser = createUser;
exports.addToUsers = addToUsers;
exports.setUsers = setUsers;
exports.saveUser = saveUser;
exports.newUser = newUser;
exports.updateViewUser = updateViewUser;
exports.clearViewUser = clearViewUser;

var _immutable = require('immutable');

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _api = require('./api');

var api = _interopRequireWildcard(_api);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setState(state) {
  return {
    meta: { remote: false },
    type: 'SET_STATE',
    state: state
  };
}

function resetState(state) {
  return {
    meta: { remote: true },
    type: 'RESET_STATE',
    state: state
  };
}

function fetchPosts() {
  return {
    meta: { remote: false },
    type: 'POSTS_FETCH_REQUESTED'
  };
}

function setPosts(posts) {
  return {
    meta: { remote: false },
    type: 'SET_POSTS',
    posts: posts
  };
}

function postsFetchFailure(message) {
  return {
    meta: { remote: false },
    type: 'POSTS_FETCH_FAILURE',
    message: message
  };
}

function setCurrentPost(post) {
  return {
    meta: { remote: false },
    type: 'SET_CURRENT_POST',
    post: post
  };
}

function setComments(comments) {
  return {
    meta: { remote: false },
    type: 'SET_COMMENTS',
    comments: comments
  };
}

function addToComments(comment) {
  return {
    meta: { remote: false },
    type: 'ADD_TO_COMMENTS',
    comment: comment
  };
}

function setCurrentComment(comment) {
  return {
    meta: { remote: false },
    type: 'SET_CURRENT_COMMENT',
    comment: comment
  };
}

function updateClientPost(postText, postId) {
  return {
    meta: { remote: false },
    type: 'UPDATE_CLIENT_POST',
    postText: postText,
    postId: postId
  };
}

function toggleEdit() {
  return {
    meta: { remote: false },
    type: 'TOGGLE_EDIT'
  };
}

function setPostEdit() {
  var edit = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

  return {
    meta: { remote: false },
    type: 'SET_EDIT',
    edit: edit
  };
}

function clearClientPost() {
  return {
    meta: { remote: false },
    type: 'CLEAR_CLIENT_POST'
  };
}

function getPosts() {
  return function (dispatch) {
    return api.allPosts().then(function (response) {
      return response && response.data && response.data.posts ? response.data.posts : response;
    }).then(function (json) {
      return dispatch(setPosts((0, _immutable.fromJS)(json)));
    });
  };
}

function getPost(id) {
  return function (dispatch) {
    return api.getPost(id).then(function (response) {
      return response && response.data && response.data.posts ? response.data.posts : response;
    }).then(function (json) {
      if (json instanceof Array && json.length > 0) {
        json = json[0];
      }
      dispatch(setCurrentPost((0, _immutable.fromJS)(json)));
    });
  };
}

function updatePost(post) {
  return function (dispatch) {
    return api.updatePost(post).then(function (response) {
      return response && response.data && response.data.updatePost ? response.data.updatePost : response;
    }).then(function (json) {
      if (json instanceof Array && json.length > 0) {
        json = json[0];
      }
      dispatch(setCurrentPost((0, _immutable.fromJS)(json)));
    });
  };
}

function getCommentsForPost(postid) {
  return function (dispatch) {
    return api.getCommentsForPost(postid).then(function (response) {
      return response && response.data && response.data.comments ? response.data.comments : response;
    }).then(function (json) {
      return dispatch(setComments((0, _immutable.fromJS)(json)));
    });
  };
}

function updateClientComment(comment) {
  return {
    meta: { remote: false },
    type: 'UPDATE_CLIENT_COMMENT',
    comment: comment
  };
}

function clearClientComment() {
  return {
    meta: { remote: false },
    type: 'CLEAR_CLIENT_COMMENT'
  };
}

function addComment(comment, postId) {
  var userId = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

  return function (dispatch) {
    return api.addComment(comment, postId, userId).then(function (response) {
      return response && response.data && response.data.addComment ? response.data.addComment : response;
    }).then(function (json) {
      return dispatch(addToComments((0, _immutable.fromJS)(json)));
    });
  };
}

function getUsers() {
  return function (dispatch) {
    return api.allUsers().then(function (response) {
      return response && response.data && response.data.users ? response.data.users : response;
    }).then(function (json) {
      return dispatch(setUsers((0, _immutable.fromJS)(json)));
    });
  };
}

function createUser(user) {
  return function (dispatch) {
    return api.createUser(user).then(function (response) {
      return response && response.data && response.data.createUser ? response.data.createUser : response;
    }).then(function (json) {
      if (json instanceof Array && json.length > 0) {
        json = json[0];
      }
      dispatch(addToUsers((0, _immutable.fromJS)(json)));
    });
  };
}

function addToUsers(user) {
  return {
    meta: { remote: false },
    type: 'ADD_TO_USERS',
    user: user
  };
}

function setUsers(users) {
  return {
    meta: { remote: false },
    type: 'SET_USERS',
    users: users
  };
}

function saveUser(user) {
  return {
    meta: { remote: true },
    type: 'UPDATE_USER',
    user: user
  };
}

function newUser() {
  return {
    meta: { remote: false },
    type: 'NEW_USER'
  };
}

function updateViewUser(user) {
  return {
    meta: { remote: false },
    type: 'UPDATE_VIEW_USER',
    user: user
  };
}

function clearViewUser() {
  return {
    meta: { remote: false },
    type: 'CLEAR_VIEW_USER'
  };
}