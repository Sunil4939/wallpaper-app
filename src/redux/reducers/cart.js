import {
  GET_CARTS_BYUSERID,
  GET_CART_BY_USERID_Of_BUYNOW,
  DUMMY_ADD_CART_DATA,
} from './../types';

const initialState = {
  getcartbyuseridbuynow: null,
  getcartbyuserid: null,
  dummyaddCartData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DUMMY_ADD_CART_DATA:
      return {
        ...state,
        dummyaddCartData: action.payload,
      };

    case GET_CART_BY_USERID_Of_BUYNOW:
      return {
        ...state,
        getcartbyuseridbuynow: action.payload,
      };

    case GET_CARTS_BYUSERID:
      return {
        ...state,
        getcartbyuserid: action.payload,
      };

    default:
      return state;
  }
};
