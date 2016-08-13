// import { fromByteArray } from 'base64-js';

export default class API {
  constructor(username, password, host='localhost:8000', baseEndpointPath='/api') {
    this.baseEndpoint = `http://${host}${this.normalisePath(baseEndpointPath)}`;
    this.host = host;
    this.username = username;
    this.password = password;
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
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate',
      Connection: 'keep-alive',
      Host: this.host,
      'User-Agent': 'HerpdyDerp/0.1',
    }
  }

  get headersAuth() {
    return Object.assign({}, this.headersBase, {
      Authorization: `Basic ${btoa(`${this.username}:${this.password}`)}`
    })
  }

  get(path='/', headers={}) {
    console.log(this.headersAuth)
    const url = `${this.baseEndpoint}${this.normalisePath(path)}/`;
    return fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: new Headers(Object.assign({}, headers, this.headersAuth)),
    })
    .catch(error => {
      console.error(`Error when GETting ${url}`, error); // eslint-disable-line no-console
      throw error;
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status} (${response.statusText}) when fetching ${url}`);
      }
      return response.json();
    });
  }
}
