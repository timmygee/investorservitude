import { EventEmitter } from 'events';

import dispatcher from '../dispatcher/dispatcher';
import { ACTION_TYPES } from '../constants/constants';
// import AuthStore from './AuthStore';


const CHANGE_EVENT = 'change';

const securitiesStore = {
  securities: [],
};

class SecuritiesStore extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  getSecuritiesStore() {
    return securitiesStore;
  }
}

const securitiesStoreInstance = new SecuritiesStore();

securitiesStoreInstance.dispatchToken = dispatcher.register(payload => {
  const { actionType } = payload;

  switch (actionType) {
    // case ACTION_TYPES.CHART_FETCH_SECURITIES:
    //   dispatcher.waitFor([AuthStore.dispatchToken]);
    //   break;
    case ACTION_TYPES.CHART_FETCH_SECURITIES_RESPONSE:
      securitiesStore.securities = payload.securities;
      break;
    default:
      return;
  }

  securitiesStoreInstance.emitChange();
});

export default securitiesStoreInstance;
