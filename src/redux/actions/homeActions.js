import AsyncStorage from '@react-native-async-storage/async-storage';
import {RNToasty} from 'react-native-toasty';
import http from './../../services/api';
import {HOME_DATA, GET_ALLBLOG, GET_BLOG_BYID, GET_COMPANY} from './../types';

export const GetHomeDataApi = cb => dispatch => {
  cb && cb(true);
  http
    .get('homeApi')
    .then(async response => {
      if (response?.data?.success) {
        dispatch({
          type: HOME_DATA,
          payload: response?.data?.data,
        });
        // dispatch(GetCartByUserIdApi());
        RNToasty.Success({
          title: response?.data?.message,
        });
        cb && cb(false);
      } else {
        cb && cb(false);
        RNToasty.Info({
          title: response?.data?.message,
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

export const GetAllBlogApi = cb => dispatch => {
  cb && cb(true);
  http
    .get('getAllBlog?page=1')
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: GET_ALLBLOG,
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

export const GetBlogByIdApi = (id, navigation, cb) => dispatch => {
  cb && cb(true);
  http
    .get(`getByBlogId/${id}`)
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: GET_BLOG_BYID,
          payload: response.data?.data,
        });
        cb && cb(false);
        navigation && navigation?.navigate('BlogDetail');
      } else {
        cb && cb(false);
      }
    })
    .catch(error => {
      cb && cb(false);
    });
};
export const GetCompanyApi = cb => dispatch => {
  cb && cb(true);
  http
    .get(`company/getCompany`)
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: GET_COMPANY,
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
