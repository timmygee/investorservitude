import dispatcher from '../dispatcher/dispatcher';
import { ACTION_TYPES } from '../constants/constants';

import API from '../api/api';


const restApi = new API('tim', 'testings');


const actions = {
  getHoldings({ filter } = {}) {
    dispatcher.dispatch({
      actionType: ACTION_TYPES.CHART_FETCH_HOLDINGS,
      filter,
    });

    restApi.get('holdings')
      .catch(error => {
        console.error('getHoldings action error:', error);
        dispatcher.dispatch({
          actionType: ACTION_TYPES.CHART_API_ERROR,
          error: error,
        });
      })
      .then(holdings => dispatcher.dispatch({ // dispatch a payload to all registered callbacks
        actionType: ACTION_TYPES.CHART_FETCH_HOLDINGS_RESPONSE,
        holdings,
      }))
  }
}

export default actions;
