// Action Types
import * as actionTypes from '~/store/actions/actionTypes';

const initialState = {
  fetching: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TOPICS_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case actionTypes.FETCH_TOPICS_SUCCESS:
      return {
        ...state,
        fetching: false
      };
    case actionTypes.FETCH_TOPICS_FAILURE:
      return {
        ...state,
        fetching: false
      };
    default:
      return state;
  }
};

export default reducer;
