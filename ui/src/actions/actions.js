import dispatcher from '../dispatcher/dispatcher';
import API from '../api/api';
import { ACTION_TYPES } from '../constants/constants';
import { holdingsToSecurities } from '../util/data';


const restApi = new API('tim', 'testings');


const actions = {
  getSecurities({ filter } = {}) {
    dispatcher.dispatch({
      actionType: ACTION_TYPES.CHART_FETCH_SECURITIES,
      filter,
    });

    restApi.get('holdings')
      .catch(error => {
        console.error('getSecurities action error:', error);
        dispatcher.dispatch({
          actionType: ACTION_TYPES.CHART_API_ERROR,
          error: error,
        });
      })
      .then(holdings => dispatcher.dispatch({ // dispatch a payload to all registered callbacks
        actionType: ACTION_TYPES.CHART_FETCH_SECURITIES_RESPONSE,
        securities: holdingsToSecurities(holdings),
      }))
  }
}

export default actions;
