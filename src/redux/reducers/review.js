import {GET_SINGLE_REVIEW} from './../types';

const initialState = {
  getSingleReview: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_REVIEW:
      return {
        ...state,
        getSingleReview: action.payload,
      };
    default:
      return state;
  }
};
