import dispatcher from '../dispatcher/dispatcher';
import { ACTION_TYPES } from '../constants/constants';
import API from '../api/api';
import { holdingsToSecurities } from '../util/data';
import { getLocalAuthToken } from '../util/auth'


const restApi = new API();

const actions = {
  getSecurities({ filter } = {}) {
    dispatcher.dispatch({
      actionType: ACTION_TYPES.CHART_FETCH_SECURITIES,
      filter,
    });

    restApi.setAuthToken(getLocalAuthToken());

    restApi.get('holdings')
      .catch(error => {
        dispatcher.dispatch({
          actionType: ACTION_TYPES.API_ERROR,
          error: error,
        });
        throw error;
      })
      .then(holdings => dispatcher.dispatch({ // dispatch a payload to all registered callbacks
        actionType: ACTION_TYPES.CHART_FETCH_SECURITIES_RESPONSE,
        securities: holdingsToSecurities(holdings),
      }))
  },

  // If username and password are omitted, this function will try to get the token from localStorage
  getAuthToken(username, password) {
    dispatcher.dispatch({
      actionType: ACTION_TYPES.FETCH_AUTH_TOKEN,
    });

    // See if the token is stored locally
    const localAuthToken = getLocalAuthToken();
    console.log('localAuthToken', localAuthToken)

    if (localAuthToken) {
      dispatcher.dispatch({
        actionType: ACTION_TYPES.FETCH_AUTH_TOKEN_RESPONSE,
        token: localAuthToken,
        restApi,
      });
    } else if (username && password) {
      // Couldn't get it locally, obtain it from the API
      restApi.post('obtain-auth-token', { data: { username, password } })
        .catch(error => {
          dispatcher.dispatch({
            actionType: ACTION_TYPES.API_ERROR,
            error: error,
          });
          throw error;
        })
        .then(json => {
          const { token } = json;
          dispatcher.dispatch({
            actionType: ACTION_TYPES.FETCH_AUTH_TOKEN_RESPONSE,
            token,
            restApi,
          });
        });
    }
  },
}

export default actions;
