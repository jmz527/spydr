// Main Imports
import * as actionTypes from './actionTypes';

export function authorizeUserSuccess(userEntity) {
  return {type: actionTypes.AUTHORIZE_USER_SUCCESS, userEntity};
}

export function authorizeUserFailure(errors) {
  return {type: actionTypes.AUTHORIZE_USER_FAILURE, errors};
}