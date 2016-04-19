/**
 * The reducer, a pure function with state, action signature.
 * It describes how an action transforms the state to the next state.
 * This is passed into the store
 * When the stores state updates all listeners are updated with the new state.
 */
import {List, Map} from 'immutable';

import {utils} from '../utils';

function newUser(state){
  let user = Map({
    username: '',
    email: '',
    posts: List.of(),
    comments: List.of()
  });
  return state.set('newUser', user);
}

function updateUser(state, mutUser){
  let user = state.get('newUser');
  if(mutUser.username != null){
    user = user.set('username', mutUser.username);
  }
  if(mutUser.email != null) {
    user = user.set('email', mutUser.email);
  }
  return state.set('newUser', user);
}

export default function(state = Map({users:null}), action = {type:null}) {
  console.log('***** Users Reducer action ' + action.type);
  switch (action.type) {
    case 'SET_STATE':
      state = state.merge({users: action.state.users});
      //console.log('---- 4. Users setState :' + JSON.stringify(state, null, 2));
    return state;
    case 'SET_USERS':
      state = state.set('users', action.users);
      return state;
    case 'ADD_TO_USERS':
      let users = state.get('users');
      if(users && action.user){
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
    default :
      return state;
  }
}