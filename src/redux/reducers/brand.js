import {GET_ALLBRAND} from './../types';

const initialState = {
  getAllbrand: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALLBRAND:
      return {
        ...state,
        getAllbrand: action.payload,
      };

    default:
      return state;
  }
};
