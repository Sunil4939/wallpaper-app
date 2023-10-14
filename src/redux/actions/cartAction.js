import {RNToasty} from 'react-native-toasty';
import http from './../../services/api';
import {
  GET_CARTS_BYUSERID,
  GET_CART_BY_USERID_Of_BUYNOW,
  DUMMY_ADD_CART_DATA,
} from './../types';

export const AddTOCartApi = (id, postData) => dispatch => {
  console.log('add cart ', postData, id);
  http
    .post(`cart/addToCart/${id}`, postData)
    .then(async response => {
      // console.log('AddTOCartApi res ', response);
      if (response.data.success) {
        dispatch({
          type: DUMMY_ADD_CART_DATA,
          payload: response?.data?.data?.userId,
        });
        RNToasty.Success({
          title: response.data.message,
        });
        dispatch(GetCartByUserIdApi());
      } else {
        RNToasty.Info({
          title: response.data.message,
        });
      }
    })
    .catch(error => {
      RNToasty.Error({
        title: error?.response?.data?.message,
      });
    });
};

export const GetCartByUserIdApi = (cb, navigation, couponCode) => async (dispatch, getState) => {
    const {token, getuser} = getState().auth;
    const {getaddressbyuserid, getaddressbyid} = getState().address;
    const {dummyaddCartData} = getState().cart;

    const url =  token == null ? `cart/getCartByUserId/${dummyaddCartData}` : `cart/getCartByUserId/${getuser?._id}`

    console.log('getCartByUserId  dummyaddCartData', dummyaddCartData);

    cb && cb(true);
    http.get(url, {
          params: {
            couponCode: couponCode || '',
            addressId: getaddressbyuserid?.[0]?._id || getaddressbyid?._id,
            type: 'ADDTOCART',
          },
        },
      )
      .then(async response => {
        if (response?.data?.success) {
          dispatch({
            type: GET_CARTS_BYUSERID,
            payload: response?.data,
          });

          cb && cb(false);
          navigation && navigation;
          if (response?.data?.couponData) {
            RNToasty.Success({
              title: response.data?.isMessage,
            });
          } else if (couponCode) {
            RNToasty.Normal({
              title: response.data?.isMessage,
            });
          }
        } else {
          cb && cb(false);
          dispatch({
            type: GET_CARTS_BYUSERID,
            payload: null,
          });
        }
      })
      .catch(error => {
        dispatch({
          type: GET_CARTS_BYUSERID,
          payload: null,
        });
        cb && cb(false);
      });
  };

export const AddQuantityApi = id => async (dispatch, getState) => {
  const {getuser} = getState().auth;
  const {dummyaddCartData} = getState().cart;
  const {token} = getState().auth;

  http
    .put(
      token == null
        ? `cart/addQuantity/${dummyaddCartData}/${id}?type=ADDTOCART`
        : `cart/addQuantity/${getuser?._id}/${id}?type=ADDTOCART`,
    )
    .then(async response => {
      if (response.data.success) {
        dispatch(GetCartByUserIdApi());
      } else {
        console.log('addQuantity not  success');
      }
    })
    .catch(error => {
      console.log('add quantity error');
    });
};

export const RemoveQuantityApi = id => async (dispatch, getState) => {
  const {getuser} = getState().auth;
  const {dummyaddCartData} = getState().cart;
  const {token} = getState().auth;

  http
    .put(
      token == null
        ? `cart/removeQuantity/${dummyaddCartData}/${id}?type=ADDTOCART`
        : `cart/removeQuantity/${getuser?._id}/${id}?type=ADDTOCART`,
    )
    .then(async response => {
      if (response.data.success) {
        dispatch(GetCartByUserIdApi());
        RNToasty.Success({
          title: response.data.message,
        });
      } else {
        console.log('remove not success');
      }
    })
    .catch(error => {
      console.log('Remove quantity error');
    });
};

export const RemoveCartByIdApi = id => async (dispatch, getState) => {
  const {getuser} = getState().auth;
  const {dummyaddCartData} = getState().cart;
  const {token} = getState().auth;

  http
    .put(
      token == null
        ? `cart/removeSingleProduct/${dummyaddCartData}/${id}`
        : `cart/removeSingleProduct/${getuser?._id}/${id}`,
    )
    .then(async response => {
      if (response.data.success) {
        dispatch(GetCartByUserIdApi());
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

export const AddToCartFromBuyNowApi =
  (id, postData, navigation, cb) => async dispatch => {
    cb && cb(true);
    http
      .post(`cart/addToCartFromBuyNow/${id}`, postData)
      .then(async response => {
        if (response.data?.success) {
          dispatch(GetCartByUserIdOfBuyNowApi());
          cb && cb(false);
          navigation && navigation?.navigate('OrderBuy');
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

export const GetCartByUserIdOfBuyNowApi =
  (couponCode, cb) => async (dispatch, getState) => {
    const {getuser} = getState().auth;
    const {getaddressbyid} = getState().address;
    const {getaddressbyuserid} = getState().address;
    // console.log('getCartByUserIdOfBuyNow couponCode', couponCode);
    cb && cb(true);
    http
      .get(`cart/getCartByUserIdOfBuyNow/${getuser?._id}`, {
        params: {
          couponCode: couponCode || '',
          addressId: getaddressbyuserid?.[0]?._id || getaddressbyid?._id,
          type: 'BUYNOW',
        },
      })
      .then(async response => {
        if (response.data.success) {
          dispatch({
            type: GET_CART_BY_USERID_Of_BUYNOW,
            payload: response.data,
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
