// Main Imports
import axios from 'axios';
import store from './store';
// import { addMock, enableMocking } from './mock-axios';

axios.defaults.baseURL = process.env.SPYDR_API;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

// If in MOCK MODE
if (process.env.MOCK_MODE !== 'false') {
  // If in MOCK MODE then mock the following axios calls:
  // addMock('post', '/auth/ping', mockPing);
  // enableMocking(true);
}

store.subscribe(() => {
  const storeState = store.getState();

  // Code below checks the redux store for an access token, sets it in axios header if exists.
  if (storeState.auth && storeState.auth.accessToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${
      storeState.auth.accessToken
    }`;
  }
});

/*
 * NOTE: The block below is taken from 'app-admin'. Instead of returning the whole axios instance
 * this would return just the beginnings of an http object. Might use later, might not.
 */
// Axios instance
// const instance = axios.create({
//   baseURL: process.env.USERS_API_NAME,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// Interceptors for debugging purposes and further configuration.
axios.interceptors.request.use(
  requestConfiguration => {
    // console.log('requestConfiguration:', requestConfiguration);

    return requestConfiguration;
  },
  error => {
    // console.log('error:', error);

    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    // console.log('response:', response);

    return response;
  },
  error => {
    // console.log('error:', error);

    return Promise.reject(error);
  }
);

export default axios;
