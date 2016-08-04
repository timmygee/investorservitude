import AppDispatcher from '../dispatcher/AppDispatcher';
import { ActionTypes } from '../constants/AppConstants';

import API from '../api/api';


const restApi = new API('tim', 'testings');


const HoldingActions = {
  receiveAll() {
    restApi.get('holdings')
      .then(data => AppDispatcher.dispatch({ // dispatch a payload to all registered callbacks
        actionType: ActionTypes.CHART_RECEIVE_ALL_HOLDINGS,
        data: data
      }))
      .catch(error => {
        console.error(error);
        AppDispatcher.dispatch({
          actionType: ActionTypes.CHART_API_ERROR,
          error: error,
        })
      });
  }
}

export default HoldingActions;
