import * as actionTypes from '~/store/actions/actionTypes';
import * as utilities from '~/utilities';

const initialState = {
  ids: [],
  dict: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_YTS_CHANNELS_PENDING:
      return {
        ...state,
        pending: true
      };
    case actionTypes.FETCH_YTS_CHANNELS_SUCCESS:
      return {
        ...state,
        ids: utilities.objectsArrayToIdsArray(action.data, 'uid'),
        dict: utilities.objectsArrayToObjectsHash(action.data, 'uid'),
        pending: false
      };
    case actionTypes.FETCH_YTS_CHANNELS_FAILURE:
      return {
        ...state,
        error: action.error,
        pending: false
      };
    case actionTypes.FETCH_YTS_CHANNEL_PENDING:
      return {
        ...state,
        pending: true
      };
    case actionTypes.FETCH_YTS_CHANNEL_SUCCESS:
      return {
        ...state,
        ids: [ ...state.ids, action.data.uid ],
        dict: { ...state.dict, [action.data.uid]: { ...state.dict[action.data.uid], ...action.data } },
        pending: false
      };
    case actionTypes.FETCH_YTS_CHANNEL_FAILURE:
      return {
        ...state,
        error: action.error,
        pending: false
      };
    case actionTypes.FETCH_YTS_FEED_PENDING:
      return {
        ...state,
        dict: {
          ...state.dict,
          [action.channelId]: {
            ...state.dict[action.channelId],
            feed: { ids: [], dict: {}, meta: null }
          }
        },
        pending: true
      };
    case actionTypes.FETCH_YTS_FEED_SUCCESS:
      return {
        ...state,
        dict: {
          ...state.dict,
          [action.channelId]: {
            ...state.dict[action.channelId], feed: {
              ids: utilities.objectsArrayToIdsArray(action.data, 'uid'),
              dict: utilities.objectsArrayToObjectsHash(action.data, 'uid'),
              meta: action.meta
            }
          }
        },
        pending: false
      };
    case actionTypes.FETCH_YTS_FEED_FAILURE:
      return {
        ...state,
        error: action.error,
        pending: false
      };
    case actionTypes.UPDATE_YTS_VIDEO_PENDING:
      return {
        ...state,
        updating: {
          channelId: action.channelId,
          videoId: action.videoId
        }, 
        pending: true
      };
    case actionTypes.UPDATE_YTS_VIDEO_SUCCESS:
      return {
        ...state,
        dict: {
          ...state.dict,
          [action.channelId]: {
            ...state.dict[action.channelId], feed: {
              ...state.dict[action.channelId].feed,
              dict: {
                ...state.dict[action.channelId].feed.dict,
                [action.videoId]: action.data
              }
            }
          }
        },
        pending: false
      };
    case actionTypes.UPDATE_YTS_VIDEO_FAILURE:
      return {
        ...state,
        error: action.error,
        pending: false
      };
    default:
      return state;
  }
};

export default reducer;
