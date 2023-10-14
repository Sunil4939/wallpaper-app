import AsyncStorage from '@react-native-async-storage/async-storage';
import {RNToasty} from 'react-native-toasty';
import http from './../../services/api';
import {GET_SINGLE_REVIEW} from './../types';

export const CreateReviewApi = (postData, navigation) => dispatch => {
  http
    .post(`createReview`, postData)
    .then(async response => {
      if (response.data.success) {
        RNToasty.Success({
          title: response.data.message,
        });
        navigation?.goBack();
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

// export const GetSingleReviewApi = id => dispatch => {
//   http
//     .get(`getReviewById/${id}`)
//     .then(async response => {
//       if (response.data.success) {
//         dispatch({
//           type: GET_SINGLE_REVIEW,
//           payload: response.data.data,
//         });
//         RNToasty.Success({
//           title: response.data.message,
//         });
//       } else {
//         RNToasty.Info({
//           title: response.data.message,
//         });
//       }
//     })
//     .catch(error => {
//       RNToasty.Error({
//         title: error.response.data.message,
//       });
//     });
// };
