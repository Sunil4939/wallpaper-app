import AsyncStorage from '@react-native-async-storage/async-storage';
import {RNToasty} from 'react-native-toasty';
import http from './../../services/api';
import {GET_CATEGORY, NEW_ARRIVAL, FIFTY_PERCENT_OFF} from './../types';

export const GetAllCategoryApi = cb => dispatch => {
  cb && cb(true);
  http
    .get(`getAllCategory?disable=false`)
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: GET_CATEGORY,
          payload: response.data.data,
        });
        cb && cb(false);
      } else {
        cb && cb(false);
      }
    })
    .catch(error => {
      cb && cb(false);
    });
};

export const GetNewArrivalApi = () => dispatch => {
  http
    .get(`newArrival`)
    .then(async response => {
      console.log('newArrival', response.data);
      if (response.data.success) {
        dispatch({
          type: NEW_ARRIVAL,
          payload: response?.data?.newArrival,
        });
      } else {
      }
    })
    .catch(error => {});
};
export const GetFiftypersentDiscountApi = () => dispatch => {
  http
    .get(`fiftyPersentDiscount`)
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: FIFTY_PERCENT_OFF,
          payload: response?.data?.data,
        });
      } else {
      }
    })
    .catch(error => {});
};
