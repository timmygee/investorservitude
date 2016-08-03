import AppDispatcher from '../dispatcher/AppDispatcher';
import { ActionTypes } from '../constants/AppConstants';

import API from '../api/api';


const api = new API('tim', 'testings');


export default const ChartActions = {
  getHoldings() {
    api.get('holdings')
      .then(data => AppDispatcher.dispatch({ // dispatch a payload to all registered callbacks
        actionType: ChartConstants.CHART_GET_HOLDINGS,
        data: data
      }));
  }
}
