import AsyncStorage from '@react-native-async-storage/async-storage';
import {RNToasty} from 'react-native-toasty';
import http from './../../services/api';
import {GET_COUPON} from './../types';

export const GetCouponApi = cb => dispatch => {
  cb && cb(true);
  http
    .get('getAllCoupons')
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: GET_COUPON,
          payload: response.data?.data,
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
