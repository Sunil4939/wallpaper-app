import AsyncStorage from '@react-native-async-storage/async-storage';
import {RNToasty} from 'react-native-toasty';
import http from './../../services/api';
import {GET_ORDER_BYID, GET_ORDER_BY_USERID} from './../types';
import {GetCartByUserIdApi} from './cartAction';

export const CreateOrderApi =
  (postData, navigation, couponCode, types, cb) =>
  async (dispatch, getState) => {
    const {getuser} = getState().auth;
    const {getaddressbyid} = getState().address;
    const {getaddressbyuserid} = getState().address;
    cb && cb(false, true);

    http
      .post(`order/createOrder/${getuser?._id}`, postData, {
        params: {
          couponCode: couponCode || '',
          addressId: getaddressbyid?._id || getaddressbyuserid?.[0]?._id,
          type: types,
        },
      })
      .then(async response => {
        console.log("CreateOrderApi res : ", response?.data);
        if (response.data?.success) {
          cb && cb(response.data?.data, false);
          {
            response.data?.data?.product?.[0]?.status == 'PENDING'
              ? navigation?.navigate('Payment')
              : navigation?.navigate('OrderConfirm');
          }
         
          dispatch(GetOrderByUserIdApi());
          dispatch(GetCartByUserIdApi());

          RNToasty.Success({
            title: response?.data?.message,
          });
        } else {
          RNToasty.Info({
            title: response?.data?.message,
          });
          cb && cb(false, false);
        }
      })
      .catch(error => {
        cb && cb(false, false);
        RNToasty.Error({
          title: error?.response.data?.message,
        });
        if (error?.response?.data?.message == 'product out of stock') {
          navigation && navigation?.navigate('Cart');
          cb && cb(false, false);
        }
      });
  };

export const GetOrderByIdApi = (id, navigation, cb) => async dispatch => {
  cb && cb(true);
  // console.log('order by idd ', id);
  http
    .get(`getOrderByOrderId/${id}`)
    .then(async response => {
      if (response?.data?.success) {
        dispatch({
          type: GET_ORDER_BYID,
          payload: response?.data,
        });
        cb && cb(false);
        dispatch(GetOrderByUserIdApi());
        navigation && navigation?.navigate('Order');
        RNToasty.Success({
          title: response?.data?.message,
        });
      } else {
        cb && cb(false);
        RNToasty.Info({
          title: response?.data?.message,
        });
      }
    })
    .catch(error => {
      RNToasty.Error({
        title: error?.response?.data?.message,
      });
      console.log('error getOrderByOrderId', error?.response.data);
      cb && cb(false);
    });
};

export const GetOrderByUserIdApi = cb => async (dispatch, getState) => {
  const {getuser} = getState().auth;
  cb && cb(true);
  http
    .get(`getAllOrderByUserId/${getuser?._id}`)
    .then(async response => {
      if (response.data?.success) {
        dispatch({
          type: GET_ORDER_BY_USERID,
          payload: response?.data?.data,
        });
        cb && cb(false);
      } else {
        RNToasty.Info({
          title: response.data.message,
        });
        cb && cb(false);
      }
    })
    .catch(error => {
      cb && cb(false);
      console.log('getAllOrderByUserId', error?.response?.data?.message);
    });
};

export const UpdateTransactionApi =
  (id, postData, navigation) => async dispatch => {
    // console.log('updateTransactionId postData', id, postData);
    http
      .put(`updateTransactionId/${id}`, postData)
      .then(async response => {
        if (response?.data?.success) {
          dispatch(GetOrderByUserIdApi());
          navigation && navigation?.navigate('OrderConfirm');
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
          title: error?.response.data.message,
        });
      });
  };

export const ReturnRequestStatusApi = (oId, pId) => async dispatch => {
  console.log('oId  pId', oId, pId);
  http
    .put(`returnRequestStatus/${oId}/${pId}`)
    .then(async response => {
      if (response.data?.success) {
        dispatch(GetOrderByUserIdApi());
        dispatch(UpdateTransactionApi());
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
        title: error?.response.data.message,
      });
    });
};

export const CancelledStatusApi = (id, navigation) => async dispatch => {
  http
    .put(`cancelledStatus/${id}`)
    .then(async response => {
      if (response.data?.success) {
        dispatch(GetOrderByUserIdApi());
        navigation?.goBack();
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
