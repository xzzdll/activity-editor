import axios from 'axios';
import qs from 'qs';

// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = 'http://127.0.0.1:8899/';
axios.defaults.baseURL = "http://47.98.115.136:8899";
axios.defaults.withCredentials = true;

// POST传参序列化，请求拦截器
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    // config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  console.log('错误的传参');
  return Promise.reject(error);
});

// 返回状态判断，响应拦截器
axios.interceptors.response.use((res) => {
  return res;
}, (error) => {
  console.log('网络异常');
  return Promise.reject(error);
});

export default function fetch (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      }).catch((error) => {
        reject(error);
      });
  });
}

export function says(){
  return fetch('say/list');
}

export function articals(data){
  return fetch('artical/list',data);
}

export function getVisitorMount(data){
  return fetch('count/visitor',data);
}

export function addNewActivity(data) {
  return fetch('activity/set', data);
}

export function getAllActivity() {
  return axios.get('activity/getAll');
}

export function getActivityById(data) {
  return axios.get(`activity/get${data}`);
}

export function deleteActivityById(data) {
  return fetch(`activity/delete`,data);
}

