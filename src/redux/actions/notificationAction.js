import AsyncStorage from '@react-native-async-storage/async-storage';
import http from './../../services/api';
import {GET_NOTIFICATION_USERID, GET_SEENCOUNT} from './../types';
import {RNToasty} from 'react-native-toasty';

export const GetNotificationuseridApi = () => async (dispatch, getState) => {
  const {getuser} = getState().auth;
  http
    .get(`getNotificationByUserId/${getuser?._id}?userType=USER`)
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: GET_NOTIFICATION_USERID,
          payload: response?.data?.data,
        });
        console.log('Notification  success');
      } else {
        console.log('Notification not  success');
      }
    })
    .catch(error => {
      console.log('Notification  error');
    });
};

export const GetSeenCountApi = () => async (dispatch, getState) => {
  const {getuser} = getState().auth;
  http
    .get(`seenCount/${getuser?._id}?userType=USER`)
    .then(async response => {
      if (response.data?.success) {
        dispatch({
          type: GET_SEENCOUNT,
          payload: response?.data,
        });
        console.log('SeenCount  success');
      } else {
        console.log('SeenCount not success');
      }
    })
    .catch(error => {
     
      console.log('SeenCount error', error?.response.data.message);
    });
};
