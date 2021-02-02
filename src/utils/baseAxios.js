import axios from "axios";
import {Message} from 'element-ui';
import router from "@/router";
// 统一设置baseURL
axios.defaults.baseURL = 'http://localhost:9090/';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 在请求头中添加token
    config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    let {status, data, message} = response.data;
    if (status == 20000) {
        return data;
    }
    if (status == 29999) {
        router.push("/login");
    } else {
        Message.error(message);
        return Promise.reject(false);
    }
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


export default axios;