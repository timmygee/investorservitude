export const isLoggedIn = () => !!localStorage.token;

export const login = token => localStorage.token = token;

export const logout = () => {
  delete localStorage.token;
};

export const getLocalAuthToken = () => localStorage.token;
