import * as actionTypes from '~/store/actions/actionTypes';
import * as utilities from '~/utilities';

const initialState = {
  ids: [],
  dict: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_IGRM_USERS_PENDING:
      return {
        ...state,
        pending: true
      };
    case actionTypes.FETCH_IGRM_USERS_SUCCESS:
      return {
        ...state,
        ids: utilities.objectsArrayToIdsArray(action.data, 'uid'),
        dict: utilities.objectsArrayToObjectsHash(action.data, 'uid'),
        pending: false
      };
    case actionTypes.FETCH_IGRM_USERS_FAILURE:
      return {
        ...state,
        error: action.error,
        pending: false
      };
    case actionTypes.FETCH_IGRM_USER_PENDING:
      return {
        ...state,
        pending: true
      };
    case actionTypes.FETCH_IGRM_USER_SUCCESS:
      return {
        ...state,
        ids: [ ...state.ids, action.data.uid ],
        dict: { ...state.dict, [action.data.uid]: { ...state.dict[action.data.uid], ...action.data } },
        pending: false
      };
    case actionTypes.FETCH_IGRM_USER_FAILURE:
      return {
        ...state,
        error: action.error,
        pending: false
      };
    case actionTypes.FETCH_IGRM_FEED_PENDING:
      return {
        ...state,
        dict: {
          ...state.dict,
          [action.userId]: {
            ...state.dict[action.userId], feed: { ids: [], dict: {} }
          }
        },
        pending: true
      };
    case actionTypes.FETCH_IGRM_FEED_SUCCESS:
      return {
        ...state,
        dict: {
          ...state.dict,
          [action.userId]: {
            ...state.dict[action.userId], feed: {
              ids: utilities.objectsArrayToIdsArray(action.data, 'uid'),
              dict: utilities.objectsArrayToObjectsHash(action.data, 'uid'),
            }
          }
        },
        pending: false
      };
    case actionTypes.FETCH_IGRM_FEED_FAILURE:
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
