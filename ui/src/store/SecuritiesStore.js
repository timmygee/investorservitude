import { ReduceStore } from 'flux/utils';
import { Map } from 'immutable';

import Dispatcher from '../dispatcher/dispatcher';
import { ACTION_TYPES } from '../constants/constants';


const handleSecuritiesResponse = (state, action) => {
  const { securities } = action;
  return state.set('securities', securities);
}

class SecuritiesStore extends ReduceStore {
  getInitialState() {
    return Map({
      securities: [],
    });
  }

  reduce(state, action) {
    const { actionType } = action;

    switch (actionType) {
      case ACTION_TYPES.CHART_FETCH_SECURITIES_RESPONSE:
        return handleSecuritiesResponse(state, action);
      default:
        return state;
    }
  }

  getSecurities() {
    const state = this.getState();
    return state.get('securities');
  }
}

export default new SecuritiesStore(Dispatcher);
