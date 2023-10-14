import {
  GET_PRODUCT_BYID,
  GET_ALL_PRODUCT,
  GET_RELATIVE_PRODUCT,
  GET_ALTERNATIVE_PRODUCT,
  ALLPRODUCT_FILTER,
  GET_FILTER,
} from './../types';

const initialState = {
  getAllProduct: null,
  getAllProductById: null,
  getrelativeproduct: null,
  getalternativeproduct: null,
  getallproductfilter: null,
  getFilter: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCT:
      return {
        ...state,
        getAllProduct: action.payload,
      };
    case GET_PRODUCT_BYID:
      return {
        ...state,
        getAllProductById: action.payload,
      };
    case GET_RELATIVE_PRODUCT:
      return {
        ...state,
        getrelativeproduct: action.payload,
      };
    case GET_ALTERNATIVE_PRODUCT:
      return {
        ...state,
        getalternativeproduct: action.payload,
      };

    case ALLPRODUCT_FILTER:
      return {
        ...state,
        getallproductfilter: action.payload,
      };

    case GET_FILTER:
      return {
        ...state,
        getFilter: action.payload,
      };
    default:
      return state;
  }
};
