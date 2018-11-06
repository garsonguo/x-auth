import axios from 'axios'

const baseUrl = 'http://127.0.0.1:3000'

/**
 * @param {*} 查询参数
 * @description 调用查询服务端接口
 */
export const queryFunctionList = (params) => {
    let url = `${baseUrl}/auth/queryUserList`
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
    let url = `${baseUrl}/auth/deleteUser`
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
    let url = `${baseUrl}/auth/editUser`
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