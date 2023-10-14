import {GET_COUPON} from './../types';

const initialState = {
  getcoupon: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COUPON:
      return {
        ...state,
        getcoupon: action.payload,
      };

    default:
      return state;
  }
};
