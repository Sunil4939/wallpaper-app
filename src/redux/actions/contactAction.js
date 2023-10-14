import AsyncStorage from '@react-native-async-storage/async-storage';
import {RNToasty} from 'react-native-toasty';
import http from './../../services/api';
import {GET_CONTACT_BYID} from './../types';

export const CreateContactApi =
  (postData, navigation, cb) => async (dispatch, getState) => {
    const {getuser} = getState().auth;
    cb && cb(true);
    http
      .post(`createContactUs/${getuser?._id}`, postData)
      .then(async response => {
        if (response.data.success) {
          cb && cb(false);
          RNToasty.Success({
            title: response.data.message,
          });
          navigation && navigation?.goBack();
        } else {
          cb && cb(false);
        }
      })
      .catch(error => {
        cb && cb(false);
      });
  };

export const GetContactByIdApi = cb => dispatch => {
  cb && cb(true);
  http
    .get('getByContactUsId/64e83eafddf7d24de177a81d')
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: GET_CONTACT_BYID,
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
