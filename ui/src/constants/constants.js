import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
  CHART_FETCH_SECURITIES: null,
  CHART_FETCH_SECURITIES_RESPONSE: null,
  API_ERROR: null,
  AUTH_FETCH_TOKEN: null,
  AUTH_FETCH_TOKEN_RESPONSE: null,
  AUTH_FETCH_TOKEN_RESPONSE_LOCAL: null,
  AUTH_LOGOUT: null,
});
