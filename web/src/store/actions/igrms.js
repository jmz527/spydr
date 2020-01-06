// Main Imports
import axios from '~/axios';
import * as actionTypes from './actionTypes';
import * as util from '~/utilities';

// ====== Fetch IGRM Users ======
export function fetchIgrmUsers() {
  return (dispatch) => {
    dispatch(fetchIgrmUsersPending());

    return axios.get('/api/igrm').then((response) => {
      dispatch(fetchIgrmUsersSuccess(response.data));
    }).catch((error) => {
      dispatch(fetchIgrmUsersFailure(error));
    });
  };
};

export const fetchIgrmUsersPending = util.makeActionCreator(actionTypes.FETCH_IGRM_USERS_PENDING);
export const fetchIgrmUsersSuccess = util.makeActionCreator(actionTypes.FETCH_IGRM_USERS_SUCCESS, 'data');
export const fetchIgrmUsersFailure = util.makeActionCreator(actionTypes.FETCH_IGRM_USERS_FAILURE, 'error');


// ====== Fetch Single IGRM User ======
export function fetchIgrmUser(userId) {
  return (dispatch) => {
    dispatch(fetchIgrmUserPending());

    return axios.get(`/api/igrm/${userId}`).then((response) => {
      dispatch(fetchIgrmUserSuccess(response.data));
    }).catch((error) => {
      dispatch(fetchIgrmUserFailure(error));
    });
  };
};

export const fetchIgrmUserPending = util.makeActionCreator(actionTypes.FETCH_IGRM_USER_PENDING);
export const fetchIgrmUserSuccess = util.makeActionCreator(actionTypes.FETCH_IGRM_USER_SUCCESS, 'data');
export const fetchIgrmUserFailure = util.makeActionCreator(actionTypes.FETCH_IGRM_USER_FAILURE, 'error');


// ====== Fetch IGRM User's Feed ======
export function fetchIgrmFeed(userId) {
  return (dispatch) => {
    dispatch(fetchIgrmFeedPending(userId));

    return axios.get(`/api/igrm/${userId}/items`).then((response) => {
      dispatch(fetchIgrmFeedSuccess(userId, response.data));
    }).catch((error) => {
      dispatch(fetchIgrmFeedFailure(error));
    });
  };
};

export const fetchIgrmFeedPending = util.makeActionCreator(actionTypes.FETCH_IGRM_FEED_PENDING, 'userId');
export const fetchIgrmFeedSuccess = util.makeActionCreator(actionTypes.FETCH_IGRM_FEED_SUCCESS, 'userId', 'data');
export const fetchIgrmFeedFailure = util.makeActionCreator(actionTypes.FETCH_IGRM_FEED_FAILURE, 'error');
