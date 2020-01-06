// Main Imports
import axios from '~/axios';
import * as actionTypes from './actionTypes';
import * as util from '~/utilities';

// ====== Fetch RDT Users ======
export function fetchRdtUsers() {
  return (dispatch) => {
    dispatch(fetchRdtUsersPending());

    return axios.get('/api/rdt').then((response) => {
      dispatch(fetchRdtUsersSuccess(response.data));
    }).catch((error) => {
      dispatch(fetchRdtUsersFailure(error));
    });
  };
};

export const fetchRdtUsersPending = util.makeActionCreator(actionTypes.FETCH_RDT_USERS_PENDING);
export const fetchRdtUsersSuccess = util.makeActionCreator(actionTypes.FETCH_RDT_USERS_SUCCESS, 'data');
export const fetchRdtUsersFailure = util.makeActionCreator(actionTypes.FETCH_RDT_USERS_FAILURE, 'error');


// ====== Fetch Single RDT User ======
export function fetchRdtUser(userId) {
  return (dispatch) => {
    dispatch(fetchRdtUserPending());

    return axios.get(`/api/rdt/${userId}`).then((response) => {
      dispatch(fetchRdtUserSuccess(response.data));
    }).catch((error) => {
      dispatch(fetchRdtUserFailure(error));
    });
  };
};

export const fetchRdtUserPending = util.makeActionCreator(actionTypes.FETCH_RDT_USER_PENDING);
export const fetchRdtUserSuccess = util.makeActionCreator(actionTypes.FETCH_RDT_USER_SUCCESS, 'data');
export const fetchRdtUserFailure = util.makeActionCreator(actionTypes.FETCH_RDT_USER_FAILURE, 'error');


// ====== Fetch RDT User's Feed ======
export function fetchRdtFeed(userId) {
  return (dispatch) => {
    dispatch(fetchRdtFeedPending(userId));

    let promise1 = axios.get(`/api/rdt/${userId}/downvotes`);
    let promise2 = axios.get(`/api/rdt/${userId}/upvotes`);

    return Promise.all([promise1, promise2]).then((values) => {
      let [ downvotes, upvotes ] = values;

      console.log(downvotes, upvotes);

      dispatch(fetchRdtFeedSuccess(userId, downvotes.data));
    }).catch((error) => {
      dispatch(fetchRdtFeedFailure(error));
    });
  };
};

export const fetchRdtFeedPending = util.makeActionCreator(actionTypes.FETCH_RDT_FEED_PENDING, 'userId');
export const fetchRdtFeedSuccess = util.makeActionCreator(actionTypes.FETCH_RDT_FEED_SUCCESS, 'userId', 'data');
export const fetchRdtFeedFailure = util.makeActionCreator(actionTypes.FETCH_RDT_FEED_FAILURE, 'error');


