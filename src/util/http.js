/* axios封装文件 */
import axios from "axios";
/* import { observer } from 'mobx-react-lite'
import { useStore } from '../store/index' */
axios.defaults.baseURL = 'http://localhost:3000';

    //const store = useStore();
/*  axios.interceptors.request.use(function (config) {
     // 显示loading

     store.loadingStore.changeLoading(true)
     return config;
 }, function (error) {
     return Promise.reject(error);
 }),
 axios.interceptors.response.use(function (response) {
     store.loadingStore.changeLoading(false)
     return response;
 }, function (error) {
     return Promise.reject(error);
 }) */



