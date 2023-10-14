import {AUTH_TOKEN, GET_USER} from '../types';

const initialState = {
  token: null,
  getuser: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        getuser: action.payload,
      };
    default:
      return state;
  }
};
