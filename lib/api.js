'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allPosts = allPosts;
exports.getPost = getPost;
exports.getCommentsForPost = getCommentsForPost;
exports.addComment = addComment;
exports.updatePost = updatePost;
exports.allUsers = allUsers;
exports.createUser = createUser;
exports.query = query;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gqlserver = 'http://localhost:3010/gql';

function allPosts() {
  var postsQuery = '{posts{_id,title,}}';
  return query(postsQuery);
}

function getPost(id) {
  var postsQuery = '{posts(_id:' + id + '){_id,title,body}}';
  return query(postsQuery);
}

function getCommentsForPost(postid) {
  var postsQuery = '{comments(postfk:' + postid + '){_id,body,updatedate}}';
  return query(postsQuery);
}

function addComment(comment, postfk, userfk) {
  var addCommentQuery = 'mutation { addComment(body:"' + comment + '",userfk:' + userfk + ', postfk:' + postfk + '){_id,body,updatedate,userfk,postfk}}';
  return query(addCommentQuery);
}

function updatePost(post) {
  var jsPost = post.toJS();
  var addCommentQuery = 'mutation { updatePost(_id:' + jsPost._id + ',body:"' + jsPost.body + '"){_id,title,body,userfk}}';
  return query(addCommentQuery);
}

function allUsers() {
  var usersQuery = '{users{_id,username,email}}';
  return query(usersQuery);
}

function createUser(user) {
  var jsUser = user.toJS();
  var createUserQuery = 'mutation { createUser(username:"' + jsUser.username + '", email:"' + jsUser.email + '"){_id,username,email}}';
  return query(createUserQuery);
}

function query(query) {
  console.log(JSON.stringify(gqlserver));
  return (0, _isomorphicFetch2.default)(gqlserver, {
    method: 'post',
    headers: { 'Content-Type': 'application/graphql' },
    body: query
  }).then(function (result, error) {
    return result.json();
  });
}