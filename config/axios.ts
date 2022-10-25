import axios, { AxiosRequestConfig } from "axios";
import {url} from './config'

const $api = axios.create({
   withCredentials:true,
   baseURL:url,
   
})

$api.interceptors.request.use((config:AxiosRequestConfig)=>{
   if (!config) {
      config = {};
  }
  if (!config.headers) {
      config.headers = {};
  }
  config.headers.Authorization=`${localStorage.getItem('token')}`;
  return config;
})

export default $api