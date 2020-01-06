// Main Imports
import axios from '~/axios';
import * as actionTypes from './actionTypes';
import * as util from '~/utilities';

// ====== Fetch YTS Channels ======
export function fetchYtsChannels() {
  return (dispatch) => {
    dispatch(fetchYtsChannelsPending());

    return axios.get('/api/yts').then((response) => {
      dispatch(fetchYtsChannelsSuccess(response.data));
    }).catch((error) => {
      dispatch(fetchYtsChannelsFailure(error));
    });
  };
};

export const fetchYtsChannelsPending = util.makeActionCreator(actionTypes.FETCH_YTS_CHANNELS_PENDING);
export const fetchYtsChannelsSuccess = util.makeActionCreator(actionTypes.FETCH_YTS_CHANNELS_SUCCESS, 'data');
export const fetchYtsChannelsFailure = util.makeActionCreator(actionTypes.FETCH_YTS_CHANNELS_FAILURE, 'error');


// ====== Fetch Single YTS Channels ======
export function fetchYtsChannel(channelId) {
  return (dispatch) => {
    dispatch(fetchYtsChannelPending());

    return axios.get(`/api/yts/${channelId}`).then((response) => {
      dispatch(fetchYtsChannelSuccess(response.data));
    }).catch((error) => {
      dispatch(fetchYtsChannelFailure(error));
    });
  };
};

export const fetchYtsChannelPending = util.makeActionCreator(actionTypes.FETCH_YTS_CHANNEL_PENDING);
export const fetchYtsChannelSuccess = util.makeActionCreator(actionTypes.FETCH_YTS_CHANNEL_SUCCESS, 'data');
export const fetchYtsChannelFailure = util.makeActionCreator(actionTypes.FETCH_YTS_CHANNEL_FAILURE, 'error');


// ====== Fetch YTS Channel's Feed ======
export function fetchYtsFeed(channelId, queryParams) {
  return (dispatch) => {
    dispatch(fetchYtsFeedPending(channelId));

    // console.log('queryParams');
    // console.log(queryParams);

    return axios.get(`/api/yts/${channelId}/videos${queryParams}`).then((response) => {

      console.log(response.data);
      // console.log(response.data.count / response.data.pageLimit);
      // console.log({
      //   count: response.data.count,
      //   page: response.data.page,
      //   pageCount: response.data.pageCount,
      //   pageLimit: response.data.pageLimit
      // });

      dispatch(fetchYtsFeedSuccess(channelId, response.data.rows, {
        count: response.data.count,
        page: response.data.page,
        pageCount: response.data.pageCount,
        pageLimit: response.data.pageLimit
      }));
    }).catch((error) => {
      dispatch(fetchYtsFeedFailure(error));
    });
  };
};

export const fetchYtsFeedPending = util.makeActionCreator(actionTypes.FETCH_YTS_FEED_PENDING, 'channelId');
export const fetchYtsFeedSuccess = util.makeActionCreator(actionTypes.FETCH_YTS_FEED_SUCCESS, 'channelId', 'data', 'meta');
export const fetchYtsFeedFailure = util.makeActionCreator(actionTypes.FETCH_YTS_FEED_FAILURE, 'error');


// ====== Update YTS Video ======
export function updateYtsVideo(channelId, videoId, update) {
  return (dispatch) => {
    dispatch(updateYtsVideoPending(channelId, videoId));

    return axios.put(`/api/yts/${channelId}/videos/${videoId}`, update).then((response) => {
      dispatch(updateYtsVideoSuccess(channelId, videoId, response.data));
    }).catch((error) => {
      dispatch(updateYtsVideoFailure(error));
    });
  };
};

export const updateYtsVideoPending = util.makeActionCreator(actionTypes.UPDATE_YTS_VIDEO_PENDING, 'channelId', 'videoId');
export const updateYtsVideoSuccess = util.makeActionCreator(actionTypes.UPDATE_YTS_VIDEO_SUCCESS, 'channelId', 'videoId', 'data');
export const updateYtsVideoFailure = util.makeActionCreator(actionTypes.UPDATE_YTS_VIDEO_FAILURE, 'error');
