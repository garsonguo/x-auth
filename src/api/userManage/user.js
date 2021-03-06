import axios from 'axios'

const baseUrl = 'http://127.0.0.1:3000'

/**
 * @param {*} loginModal登录model
 * @description 调用登录服务端接口
 */
export const login = (loginModal) => {
    let url = `${baseUrl}/userManage/user/login?name=${loginModal.user}&&password=${loginModal.password}`
    return axios.get(url)
}

/**
 * @param {*} loginModal登录model
 * @description 调用登录服务端接口
 */
export const registered = (registeredModal) => {
    let url = `${baseUrl}/userManage/user/registered`
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
 * @param {*} 查询参数
 * @description 调用查询服务端接口
 */
export const queryUserList = (params) => {
    let url = `${baseUrl}/userManage/user/queryUserList`
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params
        }).then(res => {
            if (res.status === 200) {
                resolve(res.data.result)
            } else {
                reject(res)
            }
        })
    })
}

/**
 * @description 调用登录服务端接口
 */
export const deleteUser = (id) => {
    let url = `${baseUrl}/userManage/user/deleteUser`
    let idObj = {
        "id": id
    }
    return new Promise((resolve, reject) => {
        axios.post(url, idObj).then(res => {
            if (res.status === 200) {
                resolve(res)
            } else {
                reject(res)
            }
        })
    })
}

/**
 * @param {*} 编辑修改的model
 * @description 调用编辑用户服务端接口
 */
export const editUser = (model) => {
    let url = `${baseUrl}/userManage/user/editUser`
    return new Promise((resolve, reject) => {
        axios.post(url, model).then(res => {
            if (res.status === 200) {
                resolve(res)
            } else {
                reject(res)
            }
        })
    })
}

/**
 * @param {*} 编辑修改的model
 * @description 调用编辑用户服务端接口
 */
export const queryMenuByUserName = (params) => {
    let url = `${baseUrl}/userManage/user/queryMenuByUserName`
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params
        }).then(res => {
            if (res.status === 200) {
                resolve(res)
            } else {
                reject(res)
            }
        })
    })
}