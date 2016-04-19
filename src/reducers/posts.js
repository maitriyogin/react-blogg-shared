/**
 * The reducer, a pure function with state, action signature.
 * It describes how an action transforms the state to the next state.
 * This is passed into the store
 * When the stores state updates all listeners are updated with the new state.
 */
import {utils} from '../utils';
import {List, Map} from 'immutable';

function setCurrentPost(state,post){
  console.log('setCurrentPost :' + JSON.stringify(post));
  state = state.set('currentPost', post);
  return state;
}

function setComments(state,comments){
  console.log('setCurrentComment :' + JSON.stringify(comments));
  state = state.set('comments', comments);
  return state;
}

function setCurrentComment(state,comment){
  console.log('setCurrentComment :' + JSON.stringify(comment));
  state = state.set('currentComment', comment);
  return state;
}

function updateClientComment(state, comment){
  return state.set('clientComment', comment);
}

function updateClientPost(state, postText, postId){
  let post = utils.getItem(state, 'posts', postId);
  post = post.set('body');
  let posts = utils.updateItem(state.get('posts'), post, postId);
  state = state.set('posts', posts);
  return state;
}

export default function(state = Map({posts:null, comments:null}), action = {type:null}) {
  console.log('***** Posts Reducer action ' + action.type);
  if(action.type == 'TOGGLE_EDIT'){
    console.log('++++++++++ 3. store takes toggle_edit and passes it to its reducers');
  }
  switch (action.type) {
    case 'SET_STATE':
      state = state.merge({posts:action.state.posts, comments:action.state.comments});
      //console.log('---- 3. Posts setState :' + JSON.stringify(state, null, 2));
      //console.log('*** posts set state' + JSON.stringify(state, null, 2));
      return state;
    case 'UPDATE_CLIENT_POST':
      state = state.setIn(['currentPost', 'body'], action.postText);
      return state;
    case 'CLEAR_CLIENT_POST':
      state = state.delete('clientPost');
      //console.log('---- clear client comment :' + JSON.stringify(state, null, 2));
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
      //console.log('---- clear client comment :' + JSON.stringify(state, null, 2));
    case 'SET_POSTS':
      state = state.set('posts', action.posts);
      //console.log('---- clear client comment :' + JSON.stringify(state, null, 2));
      return state;
    case 'SET_CURRENT_POST':
      state = state.set('currentPost', action.post);
      return state;
    case 'SET_COMMENTS':
      state = state.set('comments', action.comments);
      return state;
    case 'ADD_TO_COMMENTS':
      let comments = state.get('comments');
      if(comments && action.comment){
        state = state.set('comments', comments.push(action.comment));
      }
      return state;
    case 'SET_CURRENT_COMMENT':
      state = state.set('currentComment', action.comment);
      return state;
    case 'GET_POSTS':
      state = state.set('posts', action.posts);
      //console.log('---- clear client comment :' + JSON.stringify(state, null, 2));
      return state;
    return state;
    default :
      return state;
  }
}