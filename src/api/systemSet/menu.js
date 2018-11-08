import axios from 'axios'

const baseUrl = 'http://127.0.0.1:3000'

/**
 * @param {*} 查询参数
 * @description 调用查询服务端接口
 */
export const queryList = () => {
    let url = `${baseUrl}/systemSet/menu/queryList`
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
/**
 * @param {*} model
 * @description 调用新增服务端接口
 */
export const add = (modal) => {
    let url = `${baseUrl}/systemSet/menu/add`
    return new Promise((resolve, reject) => {
        axios.post(url, modal).then(res => {
            if (res.status === 200) {
                resolve(res)
            } else {
                reject(res)
            }
        })
    })
}
/**
 * @description 调用登删除服务端接口
 */
export const deleteMenu = (id) => {
    let url = `${baseUrl}/systemSet/menu/delete`
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
 * @param {*} model
 * @description 调用编辑服务端接口
 */
export const edit = (model) => {
    let url = `${baseUrl}/systemSet/menu/edit`
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