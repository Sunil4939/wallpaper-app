import AsyncStorage from '@react-native-async-storage/async-storage';
import http from './../../services/api';
import {GET_TESTIMONIAL} from './../types';

export const GetTestimonialApi = cb => dispatch => {
  cb && cb(true);
  http
    .get(`getAllTactimonial`)
    .then(async response => {
      if (response.data.success) {
        cb && cb(false);
        dispatch({
          type: GET_TESTIMONIAL,
          payload: response.data.data,
        });
      } else {
        cb && cb(false);
      }
    })
    .catch(error => {
      cb && cb(false);
    });
};
