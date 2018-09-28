import axios from 'axios'
import {
    deleteToken,
    getToken
} from './auth.js'

const baseUrl = 'https://www.easy-mock.com/mock/5ba33f89922af34dcd1e952e/x-auth'

const service = axios.create({
    baseURL: baseUrl, // api的base_url
    timeout: 20000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
    // Do something before request is sent
    const token = getToken()
    if(token){
        config.headers['Authorization'] = token
    }
    return config
}, error => {
    // Do something with request error
    //console.log(error) // for debug
    Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.statusCode !== 200) {
            return Promise.reject('error');
        } else {
            return response;
        }
    },
    error => {
        if (error.response && error.response.status === 401) {
            deleteToken();
            if (error.config.url.indexOf("logout") === -1) {
                // 登陆信息已过期,请重新登陆
            }
        } else if (error.response && error.response.status === 500) {
            // 系统错误
        } else if (error.message.indexOf("timeout") > -1) {
            // 网络超时
        } else if (error == "403") {
            // 
        } else {
            // 网络错误
        }
        return Promise.reject(error)
    })

export default service