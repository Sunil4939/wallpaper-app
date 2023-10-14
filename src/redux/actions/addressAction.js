import {RNToasty} from 'react-native-toasty';
import http from './../../services/api';
import {GET_ADDRESS_BYUSERID, GET_ADDRESS_BYID, GET_PINCODE} from './../types';

export const CreateAddressApi =(postData, navigation, cb) => async (dispatch, getState) => {
    const {getuser} = getState().auth;

    cb && cb(true);
    http.post(`createAddress/${getuser?._id}`, postData)
      .then(async response => {
        console.log("create address res : ", response?.data);
        if (response?.data?.success) {
          cb && cb(false);
          dispatch(GetAddressByUserIdApi());
          RNToasty.Success({
            title: response?.data?.message,
          });
           navigation?.goBack();
        } else {
          RNToasty.Info({
            title: response?.data?.message,
          });
        }
      })
      .catch(error => {
        cb && cb(false);
        console.log("create address error : ", error?.response?.data?.message);
        RNToasty.Error({
          title: error?.response?.data?.message,
        });
      });
  };

export const GetPincodeApi = (pincode, res) => async (dispatch, getState) => {
  res && res(null)
  http
    .get(`getByPincode?pincode=${pincode}`)
    .then(async response => {
      console.log('picode res', response?.data);
      if (response?.data?.success) {
        dispatch({
          type: GET_PINCODE,
          payload: response?.data?.data,
        });
        res(response?.data?.data)
        RNToasty.Success({
          title: response?.data?.message,
        });
        // dispatch(CreateAddressApi());
      } else {
        res(null)
        RNToasty.Info({
          title: response?.data?.message,
        });
      }
    })
    .catch(error => {
      res(null)
      dispatch({
        type: GET_PINCODE,
        payload: null,
      });
      RNToasty.Error({
        title: error?.response?.data?.message,
      });
      console.log('pincode error', error?.response?.data);
    });
};

export const GetAddressByUserIdApi = cb => async (dispatch, getState) => {
  const {getuser} = getState().auth;
  cb && cb(true);
  http
    .get(`getAllAddressByUserId/${getuser?._id}`)
    .then(async response => {
      if (response.data?.success) {
        dispatch({
          type: GET_ADDRESS_BYUSERID,
          payload: response?.data?.data,
        });
        if (response?.data?.data?.length == 0) {
          dispatch({
            type: GET_ADDRESS_BYID,
            payload: null,
          });
        }
        cb && cb(false);
      } else {
        cb && cb(false);
        dispatch({
          type: GET_ADDRESS_BYUSERID,
          payload: null,
        });
      }
    })
    .catch(error => {
      cb && cb(false);
      dispatch({
        type: GET_ADDRESS_BYUSERID,
        payload: null,
      });
    });
};

export const GetAddressByIdApi = (id, navigation, cb) => async dispatch => {
  cb && cb(true);
  http
    .get(`getAddressById/${id}`)
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: GET_ADDRESS_BYID,
          payload: response.data.data,
        });
        dispatch(GetAddressByUserIdApi());
        cb && cb(false);
        navigation && navigation?.goBack();
      } else {
        cb && cb(false);
        dispatch({
          type: GET_ADDRESS_BYID,
          payload: null,
        });
      }
    })
    .catch(error => {
      cb && cb(false);
      dispatch({
        type: GET_ADDRESS_BYID,
        payload: null,
      });
    });
};

export const AddressUpdateApi =
  (id, post, navigation, cb) => async dispatch => {
    cb && cb(true);
    http
      .put(`updateAddress/${id}`, post)
      .then(async response => {
        if (response.data.success) {
          RNToasty.Success({
            title: response.data.message,
          });
          dispatch(GetAddressByIdApi());
          dispatch(GetAddressByUserIdApi());
          cb && cb(false);
          navigation && navigation?.goBack();
        } else {
          RNToasty.Info({
            title: response.data.message,
          });
          cb && cb(false);
        }
      })
      .catch(error => {
        RNToasty.Error({
          title: error.response.data.message,
        });
        cb && cb(false);
      });
  };
export const GetAddressDeleteApi = id => async dispatch => {
  http
    .delete(`deleteAddress/${id}`)
    .then(async response => {
      if (response.data.success) {
        RNToasty.Success({
          title: response.data.message,
        });
        dispatch(GetAddressByUserIdApi());
        dispatch(GetAddressByIdApi());
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
