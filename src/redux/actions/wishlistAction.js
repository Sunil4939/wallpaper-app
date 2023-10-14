import AsyncStorage from '@react-native-async-storage/async-storage';
import {RNToasty} from 'react-native-toasty';
import http from './../../services/api';
import {GET_WISHLIST_BYID, GET_WISHLIST_BY_USERID} from './../types';
import {formDataHeaders} from './../../services/formDataHeaders';

export const CreateWishlistApi = (pId, cb) => async (dispatch, getState) => {
  const {getuser} = getState().auth;
  cb && cb(true, false);
  http
    .post(`createWishlist`, {
      productId: pId,
      userId: getuser?._id,
    })
    .then(async response => {
      if (response?.data?.success) {
        dispatch(GetWishlistByUserIdApi());
        RNToasty.Success({
          title: response?.data?.message,
        });
        console.log('createWishlist sucess');
        cb && cb(false, true);
      } else {
        console.log('createWishlist  else');
        cb && cb(false, false);
      }
    })
    .catch(error => {
      console.log('createWishlist error : ', error?.response?.data);
      cb && cb(false, false);
    });
};

export const DeleteWishlistApi = (pId, cb) => async (dispatch, getState) => {
  const {getuser} = getState().auth;
  cb && cb(true, false);
  http
    .delete(`deleteWishlist`, {
      data: {
        productId: pId,
        userId: getuser?._id,
      },
    })
    .then(async response => {
      if (response.data?.success) {
        dispatch(GetWishlistByUserIdApi());
        RNToasty.Success({
          title: response.data.message,
        });
        cb && cb(false, true);
      } else {
        RNToasty.Info({
          title: response.data.message,
        });
        cb && cb(false, false);
      }
    })
    .catch(error => {
      cb && cb(false, false);
      console.log('deleteWishlist error : ', error?.response?.data);
      RNToasty.Error({
        title: error?.response?.data?.message,
      });
    });
};
export const GetWishlistByUserIdApi = cb => async (dispatch, getState) => {
  const {getuser} = getState().auth;
  cb && cb(true);
  http
    .get(`getAllWishlistByUserId/${getuser?._id}`)
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: GET_WISHLIST_BY_USERID,
          payload: response?.data?.data,
        });
        RNToasty.Success({
          title: response?.data.message,
        });
        cb && cb(false);
      } else {
        cb && cb(false);
        RNToasty.Info({
          title: response.data.message,
        });
      }
    })
    .catch(error => {
      cb && cb(false);
      RNToasty.Error({
        title: error?.response?.data?.message,
      });
    });
};
export const GetWishlistByIdApi = (id, cb) => async dispatch => {
  cb && cb(true);
  http
    .get(`getWishlistById/${id}`)
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: GET_WISHLIST_BYID,
          payload: response?.data,
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
