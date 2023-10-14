import {GET_ORDER_BYID, GET_ORDER_BY_USERID} from './../types';

const initialState = {
  getorderbyid: null,
  getorderbyuserid: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_BYID:
      return {
        ...state,
        getorderbyid: action.payload,
      };

    case GET_ORDER_BY_USERID:
      return {
        ...state,
        getorderbyuserid: action.payload,
      };

    default:
      return state;
  }
};
