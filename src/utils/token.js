/**
 *
 * token.js
 * axios default headers setup
 */

import axios from 'axios';

const setToken = token => {
  axios.defaults.baseURL = 'http://localhost:3000';
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setToken;
