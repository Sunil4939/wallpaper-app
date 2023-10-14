import {GET_TESTIMONIAL} from './../types';

const initialState = {
  getTestimonial: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TESTIMONIAL:
      return {
        ...state,
        getTestimonial: action.payload,
      };
    default:
      return state;
  }
};
