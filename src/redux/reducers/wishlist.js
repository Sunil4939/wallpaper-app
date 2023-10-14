import {GET_WISHLIST_BYID, GET_WISHLIST_BY_USERID} from './../types';

const initialState = {
  getwishlistbyid: null,
  getwishlistbyuserid: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_WISHLIST_BYID:
      return {
        ...state,
        getwishlistbyid: action.payload,
      };

    case GET_WISHLIST_BY_USERID:
      return {
        ...state,
        getwishlistbyuserid: action.payload,
      };

    default:
      return state;
  }
};
