// Action Types
import * as actionTypes from '~/store/actions/actionTypes';

// Custom
import reducer from './user';

describe('user reducer', () => {
  const initialState = {
    loginSuccess: false
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should return true loginSuccess on successful authorization', () => {
    expect(reducer(initialState, {
      userEntity: {}, // TODO: User config
      type: actionTypes.AUTHORIZE_USER_SUCCESS,
    })).toEqual({ currentUser: {}, loginSuccess: true });
  });

  it('should return false loginSuccess on failed authorization', () => {
    expect(reducer(initialState, {
      errors: {}, // TODO: Errors config
      type: actionTypes.AUTHORIZE_USER_FAILURE,
    })).toEqual({ loginErrors: {}, loginSuccess: false });
  });

});
