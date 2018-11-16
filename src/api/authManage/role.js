import axios from 'axios'

const baseUrl = 'http://127.0.0.1:3000'

/**
 * @param {*} 查询参数
 * @description 调用查询服务端接口
 */
export const queryList = (params) => {
    let url = `${baseUrl}/authManage/role/queryList`
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
 * @param {*} model
 * @description 调用新增服务端接口
 */
export const add = (modal) => {
    let url = `${baseUrl}/authManage/role/add`
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
export const deleteRole = (id) => {
    let url = `${baseUrl}/authManage/role/delete`
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
    let url = `${baseUrl}/authManage/role/edit`
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
 * @param {*} model
 * @description 调用编辑服务端接口
 */
export const roleAddUser = (ids) => {
    let url = `${baseUrl}/authManage/role/roleAddUser`
    return new Promise((resolve, reject) => {
        axios.post(url, ids).then(res => {
            if (res.status === 200) {
                resolve(res)
            } else {
                reject(res)
            }
        })
    })
}

/**
 * 
 * @param {*} id 
 * @description 查询该角色下的用户
 */
export const queryRoleUser = (params) => {
    let url = `${baseUrl}/authManage/role/queryRoleUser`
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

/**
 * 
 * @param {*} id 
 * @description 查询该用户下的角色
 */
export const queryUserRole = (params) => {
    let url = `${baseUrl}/authManage/role/queryUserRole`
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

/**
 * 
 * @param {*} params 
 * @description 新增角色权限
 */
export const addAccess = (params) => {
    let url = `${baseUrl}/authManage/role/addAccess`
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(res => {
            if (res.status === 200) {
                resolve(res)
            } else {
                reject(res)
            }
        })
    })
}

/**
 * 
 * @param {*} params 
 * @description 查询角色权限
 */
export const queryAccessList = (params) => {
    let url = `${baseUrl}/authManage/role/queryAccessList`
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

/**
 * @description 调用登删除服务端接口
 */
export const deleteRoleUser = (ids) => {
    let url = `${baseUrl}/authManage/role/deleteRoleUser`
    let idObj = {
        roleId: ids.roleId,
        userId: ids.userId
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