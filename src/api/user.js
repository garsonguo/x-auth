import axios from 'axios'

const baseUrl = 'http://127.0.0.1:3000'

/**
 * @param {*} loginModal登录model
 * @description 调用登录服务端接口
 */
export const login = (loginModal) => {
    let url = `${baseUrl}/auth/login?name=${loginModal.user}&&password=${loginModal.password}`
    return axios.get(url)
}

/**
 * @param {*} loginModal登录model
 * @description 调用登录服务端接口
 */
export const registered = (registeredModal) => {
    let url = `${baseUrl}/auth/registered`
    return new Promise((resolve, reject) => {
        axios.post(url, registeredModal).then(res => {
            if (res.status === 200) {
                resolve(res)
            } else {
                reject(res)
            }
        })
    })
}

/**
 * @param {*} loginModal登录model
 * @description 调用登录服务端接口
 */
export const queryUserList = (params) => {
    let url = ''
    if (params) {
        if (params.name || params.email) {
            url = `${baseUrl}/auth/queryUserList?name=${params.name}&&email=${params.email}`
        } else {
            url = `${baseUrl}/auth/queryUserList`
        }
    } else {
        url = `${baseUrl}/auth/queryUserList`
    }

    return new Promise((resolve, reject) => {
        axios.get(url).then(res => {
            if (res.status === 200) {
                resolve(res.data.result)
            } else {
                reject(res)
            }
        })
    })
}