import Cookies from 'js-cookie'
/**
 * @description 获取cookie中的token
 */

export const getToken = () => {
    let token = Cookies.get('token')
    if (token) {
        return token
    }
    return false
}

/**
 * @param {*} token
 * @description 设置token保存到cookie
 */

export const setToken = (token) => {
    Cookies.set('token', token, {
        expires: 1
    })
}

/**
 * @param {*} token的名字
 * @description 删除cookie中的token
 */

export const deleteToken = () => {
    Cookies.remove('token')
}

/**
 * @description 获取cookie中的用户信息
 */

export const getUserInfo = () => {
    let userInfo = Cookies.get('userInfo')
    if (userInfo) {
        return userInfo
    }
    return false
}

/**
 * @param {*} userInfo
 * @description 将用户信息保存到cookie
 */

export const setUserInfo = (userInfo) => {
    Cookies.set('userInfo', userInfo, {
        expires: 1
    })
}

/**
 * @param {*} token的名字
 * @description 删除cookie中的用户信息
 */

export const deleteUserInfo = () => {
    Cookies.remove('userInfo')
}