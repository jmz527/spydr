// Main Imports
import * as actionTypes from './actionTypes';

export const anAction = (data) => {
  return {
    payload: data,
    type: actionTypes.AN_ACTION
  };
};
