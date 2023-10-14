import {GET_NOTIFICATION_USERID, GET_SEENCOUNT} from './../types';

const initialState = {
  getallNotification: null,
  getseencount: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATION_USERID:
      return {
        ...state,
        getallNotification: action.payload,
      };

    case GET_SEENCOUNT:
      return {
        ...state,
        getseencount: action.payload,
      };
    default:
      return state;
  }
};
