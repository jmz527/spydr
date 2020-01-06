// Action Types
import * as actionTypes from '~/store/actions/actionTypes';

const initialState = {
  loginSuccess: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHORIZE_USER_SUCCESS: {
      return {
        ...state,
        currentUser: action.userEntity,
        loginSuccess: true
      };
    }
    case actionTypes.AUTHORIZE_USER_FAILURE:
      return {
        ...state,
        loginErrors: action.errors,
        loginSuccess: false
      };
    default:
      return state;
  }
};

export default reducer;
