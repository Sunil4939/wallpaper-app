import AsyncStorage from '@react-native-async-storage/async-storage';
import {RNToasty} from 'react-native-toasty';
import http from './../../services/api';
import {AUTH_TOKEN, GET_USER} from './../types';
import objectToFormData from './../../services/objectToFormData';
import {formDataHeaders} from './../../services/formDataHeaders';
import {GetWishlistByUserIdApi} from './wishlistAction';
import {GetCartByUserIdApi} from './cartAction';
import {GetSeenCountApi} from './notificationAction';
export const AuthFunction = () => dispatch => {
  dispatch({
    type: AUTH_TOKEN,
    payload: 's',
  });
};

export const InitialCall = () => async (dispatch, getState) => {
  const {token} = getState().auth;
  dispatch(GetCartByUserIdApi());
  if (token) {
    dispatch(GetuserIdApi());
    dispatch(GetCartByUserIdApi());
    dispatch(GetWishlistByUserIdApi());
    dispatch(GetSeenCountApi());
  }
 
};

export const LogoutApi = () => dispatch => {
  dispatch({
    type: AUTH_TOKEN,
    payload: null,
  });
  dispatch({
    type: GET_USER,
    payload: null,
  });
  AsyncStorage.removeItem('@USER_TOKEN');
  RNToasty.Normal({
    title: 'LogOut Successful',
  });
};
export const LoginApi = (postData, cb) => dispatch => {
  cb && cb(true);
  http
    .post('login', postData)
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: AUTH_TOKEN,
          payload: response?.data?.data?.token,
        });
        dispatch({
          type: GET_USER,
          payload: response?.data?.data,
        });
        dispatch(GetuserIdApi());
        await AsyncStorage.setItem('@USER_TOKEN', response?.data?.data?.token);
        dispatch(InitialCall());

        cb && cb(false);
      } else {
        cb && cb(false);
      }
    })
    .catch(error => {
      cb && cb(false);
    });
};

export const SignUpApi = (postData, cb) => dispatch => {
  cb && cb(true);
  http
    .post('register', postData)
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: AUTH_TOKEN,
          payload: response?.data?.data?.token,
        });
        dispatch(GetuserIdApi());
        await AsyncStorage.setItem('@USER_TOKEN', response?.data?.data?.token);
        dispatch(InitialCall());

        cb && cb(false);
      } else {
        cb && cb(false);
      }
    })
    .catch(error => {
      cb && cb(false);
    });
};

export const OTPApi = (postData, navigation, check, cb) => async dispatch => {
  cb && cb(true);
  http
    .post('sendOtp', {
      phoneNumber: postData.phoneNumber,
      check: check,
    })
    .then(async response => {
      if (response.data.success) {
        navigation?.navigate('OTP', {
          data: postData,
          check: check,
          otp: response.data?.otp,
        });
        cb && cb(false);
      } else {
        cb && cb(false);
      }
    })
    .catch(error => {
      cb && cb(false);
      if (error?.response?.data?.message == 'User Not Found') {
        navigation?.navigate('Register', {phoneNumber: postData?.phoneNumber});
      }
    });
};

export const GetuserIdApi =
  (id, navigation, cb) => async (dispatch, getState) => {
    const {getuser} = getState().auth;

    console.log('GetuserIdApi enter : ', getuser?._id);
    cb && cb(true);
    http
      .get(`getUserById/${getuser?._id}`)
      .then(async response => {
        if (response.data.success) {
          dispatch({
            type: GET_USER,
            payload: response?.data?.data,
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

export const UpdateUserApi =
  (postData, navigation, cb) => async (dispatch, getState) => {
    const {getuser} = getState().auth;
    postData = objectToFormData(postData);
    cb && cb(true);
    http
      .put(`updateUser/${getuser?._id}`, postData, formDataHeaders)
      .then(async response => {
        if (response.data?.success) {
          dispatch(GetuserIdApi());
          RNToasty.Success({
            title: response?.data?.message
          })
          cb && cb(false);
          navigation?.goBack();
        } else {
          cb && cb(false);
        }
      })
      .catch(error => {
        cb && cb(false);
      });
  };
