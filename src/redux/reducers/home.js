import {
  HOME_DATA,
  GET_ALLBLOG,
  GET_BLOG_BYID,
  GET_COMPANY,
  ONBOARDING,
} from './../types';

const initialState = {
  getHomedata: null,
  getallblog: null,
  getblogbyid: null,
  getcompany: null,
  onboard: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HOME_DATA:
      return {
        ...state,
        getHomedata: action.payload,
      };

    case ONBOARDING:
      return {
        ...state,
        onboard: action.payload,
      };
    case GET_ALLBLOG:
      return {
        ...state,
        getallblog: action.payload,
      };

    case GET_BLOG_BYID:
      return {
        ...state,
        getblogbyid: action.payload,
      };

    case GET_COMPANY:
      return {
        ...state,
        getcompany: action.payload,
      };

    default:
      return state;
  }
};
