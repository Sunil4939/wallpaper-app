import AsyncStorage from '@react-native-async-storage/async-storage';
import {RNToasty} from 'react-native-toasty';
import http from './../../services/api';
import {GET_ALL_AFFILIATE} from './../types';

export const CreateAffiliateApi =
  (postData, navigation, cb) => async (dispatch, getState) => {
    const {getuser} = getState().auth;
    cb && cb(true);
    http
      .post(`createAffiliate`, postData)
      .then(async response => {
        if (response.data?.success) {
          navigation && navigation?.navigate('Affiliate');
          console.log('createAffiliate  success');
          cb && cb(false);
        } else {
          cb && cb(false);
        }
      })
      .catch(error => {
        console.log('createAffiliate error', error?.response?.data?.message);
        cb && cb(false);
      });
  };

export const GetAllAffiliateApi = cb => async dispatch => {
  cb && cb(true);
  http
    .get(`getAllAffiliate`)
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: GET_ALL_AFFILIATE,
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

// export const GetAddressByIdApi = (id, navigation, cb) => async dispatch => {
//   cb && cb(true);
//   http
//     .get(`getAddressById/${id}`)
//     .then(async response => {
//       if (response.data.success) {
//         dispatch({
//           type: GET_ADDRESS_BYID,
//           payload: response.data.data,
//         });
//         navigation && navigation?.goBack();
//         cb && cb(false);
//       } else {
//         cb && cb(false);
//       }
//     })
//     .catch(error => {
//       cb && cb(false);
//     });
// };
