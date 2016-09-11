// import { fromByteArray } from 'base64-js';

export default class API {
  constructor(host='localhost:8000', baseEndpointPath='/api') {
    this.baseEndpoint = `http://${host}${this.normalisePath(baseEndpointPath)}`;
    this.host = host;
    this.authToken = null;
  }

  // Converts a '/' separated path into a consistent format.
  // Trailing slashes are stripped and there will always be a single slash at the
  // start
  normalisePath(path) {
    return path
      .split('/')
      .reduce((reduced, crumb) => {
        if (crumb) {
          reduced.push(crumb);
        }
        return reduced;
      }, [''])
      .join('/');
  }

  get headersBase() {
    return {
      Accept: 'application/json, */*',
      'Content-Type': 'application/json',      
      'Accept-Encoding': 'gzip, deflate',
      Connection: 'keep-alive',
      'User-Agent': 'HerpdyDerp/0.1',
    }
  }

  get authTokenHeaders() {
    return this.authToken ? 
      { Authorization: `Token ${this.authToken}` } :
      {};
  }

  setAuthToken(authToken) {
    this.authToken = authToken;
  }

  get(path='/', { headers={} } = {}) {
    const url = `${this.baseEndpoint}${this.normalisePath(path)}/`;
    console.log(Object.assign({}, this.headersBase, this.authTokenHeaders, headers))
    return fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: Object.assign({}, this.headersBase, this.authTokenHeaders, headers),
    })
    .catch(error => {
      console.error(`Error when GETting ${url}`, error); // eslint-disable-line no-console
      throw error;
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`API error ${response.status} (${response.statusText})`);
      }
      return response.json();
    });
  }

  post(path='/', { headers={}, data={} } = {}) {
    const url = `${this.baseEndpoint}${this.normalisePath(path)}/`;
    console.log(data)
    return fetch(url, {
      method: 'POST',
      redirect: 'follow',
      headers: Object.assign({}, this.headersBase, this.authTokenHeaders, headers),
      body: JSON.stringify(data),
    })
    .catch(error => {
      console.error(`Error when POSTing ${url}`, error); // eslint-disable-line no-console
      throw error;
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`API error ${response.status} (${response.statusText})`);
      }
      return response.json();
    });
  }
}
