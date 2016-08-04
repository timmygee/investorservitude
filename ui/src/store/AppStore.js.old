import FluxStore from './FluxStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { ActionTypes } from '../constants/AppConstants';

let appState;

function reset() {
  appState = {};
}


class AppStore extends FluxStore {

  constructor() {
    super();
  }

  getState() {
    return appState;
  }

}

let appStoreInstance = new AppStore();

appStoreInstance.dispatchToken = AppDispatcher.register(action => {

  switch(action.type) {
    case ActionTypes.APP_INITIALIZED:
      reset();
      /* falls through */
    // case ActionTypes.CHART_GET_HOLDINGS:
    //   break;

    // case ActionTypes.PAGE_SWITCHED:
    //   appState.page = action.page;
    //   appState.path = action.path;
    //   break;

    // case ActionTypes.APP_RESET:
    //   reset();
    //   break;

    // case ActionTypes.POUCH_ERROR:
    //   appState.message = 'Local database error: ' + action.error.message;
    //   break;

    default:
      return;
  }

  appStoreInstance.emitChange();

});

export default appStoreInstance;
