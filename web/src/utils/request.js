import axios from "axios";
import { ElMessage } from "element-plus";
import { BASEURL } from '@/config/URL'
//设置基地址
axios.create({ 
  baseURL: BASEURL,
  timeout: 5000,
 })
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //发送请求前显示Loading效果
  //显示loading
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  console.log('11111111',error.response)
  return Promise.reject(error);
});
export default axios;