import axios from "axios";
import { history } from "umi";
import { baseURL } from './baseUrl'

const request = axios.create({
    baseURL: baseURL,
    timeout: 30000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';

    let user = JSON.parse(localStorage.getItem('dmbkgdsys-user') || '{}');
    config.headers['token'] = user.token;  //设置请求头

    return config
}, error => {
    console.log('request error:' + error); //for debug
    return Promise.reject(error)
})

// request 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(response => {
    let res = response.data;

    // 兼容服务器返回的字符串数据
    if (typeof res === 'string') {
        res = res ? JSON.parse(res) : res
    }

    if (res.code === '401') {
        history.push('/login');
    }

    return res;
}, error => {
    console.log('response error:' + error);  //for debug
    return Promise.reject(error)
})

export default request;