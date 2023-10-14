import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const baseURL = 'https://server.wellmarts.booksica.in/api/';
export const http2 = 'https://satyakabirbucket.ap-south-1.linodeobjects.com/';

const http = axios.create({
  baseURL: 'https://server.wellmarts.booksica.in/api/',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
http.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('@USER_TOKEN');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
export default http;
