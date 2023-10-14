import {GET_CATEGORY, NEW_ARRIVAL, FIFTY_PERCENT_OFF} from './../types';

const initialState = {
  getcategory: null,
  fiftypercentoff: null,
  newarrival: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FIFTY_PERCENT_OFF:
      return {
        ...state,
        fiftypercentoff: action.payload,
      };
    case NEW_ARRIVAL:
      return {
        ...state,
        newarrival: action.payload,
      };

    case GET_CATEGORY:
      return {
        ...state,
        getcategory: action.payload,
      };
    default:
      return state;
  }
};
