import Cookies from 'js-cookie'
/**
 * @param {*} currentList 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */

 export const getToken = () => {
     let token = Cookies.get('token')
     if(token){
         return token
     }
     return false
 }

 /**
 * @param {*} token
 * @description 设置token保存到cookie
 */

export const setToken = (token) => {
    Cookies.set('token', token, {expires: 1})
}

 /**
 * @param {*} token的名字
 * @description 删除cookie中的token
 */

export const deleteToken = () => {
    Cookies.remove('token')
}

/**
 * @param {*} currentList 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */

export const getUserInfo = () => {
    let userInfo = Cookies.get('userInfo')
    if(userInfo){
        return userInfo
    }
    return false
}

 /**
 * @param {*} userInfo
 * @description 设置userInfo保存到cookie
 */

export const setUserInfo = (userInfo) => {
    Cookies.set('userInfo', userInfo, {expires: 1})
}

 /**
 * @param {*} token的名字
 * @description 删除cookie中的token
 */

export const deleteUserInfo = () => {
    Cookies.remove('userInfo')
}