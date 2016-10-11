import { ReduceStore } from 'flux/utils';
import { Map } from 'immutable';

import Dispatcher from '../dispatcher/dispatcher';
import { ACTION_TYPES } from '../constants/constants';
import { login, logout } from '../util/auth';


const handleAuthTokenResponse = (state, action) => {
  const { restApi, token } = action;
  console.log('handleAuthTokenResponse', restApi, token)
  restApi.setAuthToken(token);
  login(token);
  return state.withMutations(map => map.set('loggedIn', true).set('error', null));
}

const handleLogout = (state) => {
  logout();
  return state.set('loggedIn', false);
}

const setError = (state, action) => {
  const { error } = action;
  return state.set('error', error);
}

class AuthStore extends ReduceStore {
  getInitialState() {
    return Map({
      error: null,
      loggedIn: false,
    });
  }

  reduce(state, action) {
    const { actionType } = action;

    switch (actionType) {
      case ACTION_TYPES.AUTH_FETCH_TOKEN_RESPONSE:
        return handleAuthTokenResponse(state, action);
      case ACTION_TYPES.AUTH_FETCH_TOKEN_RESPONSE_LOCAL:
        return handleAuthTokenResponse(state, action);
      case ACTION_TYPES.AUTH_LOGOUT:
        return handleLogout(state);
      case ACTION_TYPES.API_ERROR:
        return setError(state, action)
      default:
        return state;
    }
  }

  getLoggedInStatus() {
    const state = this.getState();
    return state.get('loggedIn');
  }

  getError() {
    const state = this.getState();
    return state.get('error');
  }
}

export default new AuthStore(Dispatcher);
