import {GET_CONTACT_BYID} from './../types';

const initialState = {
  getcontact: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACT_BYID:
      return {
        ...state,
        getcontact: action.payload,
      };

    default:
      return state;
  }
};
