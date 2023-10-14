import AsyncStorage from '@react-native-async-storage/async-storage';
import {RNToasty} from 'react-native-toasty';
import http from './../../services/api';
import {GET_ALLBRAND} from './../types';

export const GetAllBrandApi = cb => dispatch => {
  cb && cb(true);
  http
    .get(`getAllCategory?disable=false`)
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: GET_ALLBRAND,
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
