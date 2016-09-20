import dispatcher from '../dispatcher/dispatcher';
import { ACTION_TYPES } from '../constants/constants';
import API from '../api/api';
import { holdingsToSecurities } from '../util/data';
import { getLocalAuthToken } from '../util/auth'


const restApi = new API();

const actions = {
  getSecurities({ filter } = {}) {
    console.log('dispatch ACTION_TYPES.CHART_FETCH_SECURITIES');
    dispatcher.dispatch({
      actionType: ACTION_TYPES.CHART_FETCH_SECURITIES,
      filter,
    });

    restApi.setAuthToken(getLocalAuthToken());

    restApi.get('holdings')
      .catch(error => {
        console.log('dispatch ACTION_TYPES.API_ERROR');
        dispatcher.dispatch({
          actionType: ACTION_TYPES.API_ERROR,
          error: error,
        });
        throw error;
      })
      .then(holdings => {
        console.log('dispatch ACTION_TYPES.CHART_FETCH_SECURITIES_RESPONSE');

        dispatcher.dispatch({ // dispatch a payload to all registered callbacks
              actionType: ACTION_TYPES.CHART_FETCH_SECURITIES_RESPONSE,
              securities: holdingsToSecurities(holdings),
            })})
  },

  // If username and password are omitted, this function will try to get the token from localStorage
  getAuthToken(username, password) {
    console.log('dispatch ACTION_TYPES.AUTH_FETCH_TOKEN');
    dispatcher.dispatch({
      actionType: ACTION_TYPES.AUTH_FETCH_TOKEN,
    });

    // See if the token is stored locally
    const localAuthToken = getLocalAuthToken();
    console.log('localAuthToken', localAuthToken)

    if (localAuthToken) {
      console.log('dispatch ACTION_TYPES.AUTH_FETCH_TOKEN_RESPONSE_LOCAL');
      dispatcher.dispatch({
        actionType: ACTION_TYPES.AUTH_FETCH_TOKEN_RESPONSE_LOCAL,
        token: localAuthToken,
        restApi,
      });
    } else if (username && password) {
      // Couldn't get it locally, obtain it from the API
      restApi.post('obtain-auth-token', { data: { username, password } })
        .catch(error => {
          console.log('dispatch ACTION_TYPES.API_ERROR');
          dispatcher.dispatch({
            actionType: ACTION_TYPES.API_ERROR,
            error: error,
          });
          throw error;
        })
        .then(json => {
          const { token } = json;
          console.log('dispatch ACTION_TYPES.AUTH_FETCH_TOKEN_RESPONSE');
          dispatcher.dispatch({
            actionType: ACTION_TYPES.AUTH_FETCH_TOKEN_RESPONSE,
            token,
            restApi,
          });
        });
    }
  },

  logout() {
    console.log('dispatch ACTION_TYPES.AUTH_LOGOUT');
    dispatcher.dispatch({
      actionType: ACTION_TYPES.AUTH_LOGOUT,
    });
  }
}

export default actions;
