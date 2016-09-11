import { EventEmitter } from 'events';

import dispatcher from '../dispatcher/dispatcher';
import { ACTION_TYPES } from '../constants/constants';
import { login } from '../util/auth';


const CHANGE_EVENT = 'change';

const authStore = {
  error: null,
  token: null,
};

class AuthStore extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  getAuthStore() {
    return authStore;
  }
}

const handleAuthTokenResponse = payload => {
  const { restApi, token } = payload;
  restApi.setAuthToken(token);
  login(token);
  authStore.token = token;
  authStore.error = null;
}

const authStoreInstance = new AuthStore();

authStoreInstance.dispatchToken = dispatcher.register(payload => {
  const { actionType } = payload;

  switch (actionType) {
    case ACTION_TYPES.FETCH_AUTH_TOKEN_RESPONSE:
      handleAuthTokenResponse(payload);
      break;
    case ACTION_TYPES.API_ERROR:
      const { error } = payload;
      authStore.error = error;
      break;
    default:
      return;
  }

  authStoreInstance.emitChange();
});

export default authStoreInstance;
