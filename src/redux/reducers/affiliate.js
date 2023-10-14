import {GET_ALL_AFFILIATE} from './../types';

const initialState = {
  getAllaffiliate: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_AFFILIATE:
      return {
        ...state,
        getAllaffiliate: action.payload,
      };

    default:
      return state;
  }
};
