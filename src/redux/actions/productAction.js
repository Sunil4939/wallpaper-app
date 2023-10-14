import AsyncStorage from '@react-native-async-storage/async-storage';
import {RNToasty} from 'react-native-toasty';
import http from './../../services/api';
import {
  GET_ALL_PRODUCT,
  GET_PRODUCT_BYID,
  GET_RELATIVE_PRODUCT,
  PRODUCT_FILTER,
  ALLPRODUCT_FILTER,
  GET_FILTER,
  GET_ALTERNATIVE_PRODUCT,
} from './../types';

export const GetAllProductApi = id => dispatch => {
  http
    .get(`getAllProduct`)
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: GET_ALL_PRODUCT,
          payload: response.data.data,
        });
        RNToasty.Success({
          title: response.data.message,
        });
      } else {
        RNToasty.Info({
          title: response.data.message,
        });
      }
    })
    .catch(error => {
      RNToasty.Error({
        title: error.response.data.message,
      });
    });
};

export const GetAllProductByIdApi = (id, navigation, cb) => dispatch => {
  cb && cb(true);

  http
    .get(`getByProductId/${id}`)
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: GET_PRODUCT_BYID,
          payload: response.data.data,
        });
        cb && cb(false);
        navigation && navigation?.navigate('ProductDetail');
      } else {
        cb && cb(false);
      }
    })
    .catch(error => {
      cb && cb(false);
    });
};

export const GetRelativeProductApi =
  (id, type) => async (dispatch, getState) => {
    http
      .get(`relatedProduct/${id}`, type)
      .then(async response => {
        if (response.data.success) {
          {
            type == 'brandId' &&
              dispatch({
                type: GET_RELATIVE_PRODUCT,
                payload: response.data.data,
              });
          }
          {
            type == 'categoryId' &&
              dispatch({
                type: GET_ALTERNATIVE_PRODUCT,
                payload: response.data.data,
              });
          }
        } else {
          console.log('relative product not get');
        }
      })
      .catch(error => {
        console.log('relative product error');
      });
  };

export const GetAllFilterApi = () => async dispatch => {
  http
    .get(`filter/rangeFilter`)
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: ALLPRODUCT_FILTER,
          payload: response.data?.data,
        });
        RNToasty.Success({
          title: response.data.message,
        });
      } else {
        RNToasty.Info({
          title: response.data.message,
        });
        console.log('PRODUCT_FILTER ALL not get');
      }
    })
    .catch(error => {
      RNToasty.Error({
        title: error?.response.data.message,
      });
      console.log('PRODUCT_FILTER ALL error');
    });
};

// filter api ka filter
export const GetFilterApi = (postData, navigation, cb) => async dispatch => {
  cb && cb(true);
  http
    .get(`filter`, {
      params: {
        ...postData,
      },
    }) //filter submit pr
    .then(async response => {
      if (response?.data?.success) {
        dispatch({
          type: GET_FILTER,
          payload: response?.data,
        });
        RNToasty.Success({
          title: response?.data?.message,
        });
        cb && cb(false);
        navigation && navigation;
        console.log('GET_FILTER  get');
      } else {
        console.log('GET_FILTER not get');
        cb && cb(false);
      }
    })
    .catch(error => {
      console.log('GET_FILTER api error');
      cb && cb(false);
    });
};
