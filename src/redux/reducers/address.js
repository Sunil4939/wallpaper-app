import {GET_ADDRESS_BYUSERID, GET_PINCODE, GET_ADDRESS_BYID} from '../types';

const initialState = {
  getaddressbyuserid: null,
  getaddressbyid: null,
  getpincode: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ADDRESS_BYUSERID:
      return {
        ...state,
        getaddressbyuserid: action.payload,
      };

    case GET_ADDRESS_BYID:
      return {
        ...state,
        getaddressbyid: action.payload,
      };

    case GET_PINCODE:
      return {
        ...state,
        getpincode: action.payload,
      };

    default:
      return state;
  }
};
