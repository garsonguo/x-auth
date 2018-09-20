import axios from 'axios'
const baseUrl = 'https://www.easy-mock.com/mock/5ba33f89922af34dcd1e952e/x-auth'

 /**
 * @param {*} loginModal登录model
 * @description 调用登录服务端接口
 */
export const login = (loginModal) => {
    return axios.post(baseUrl+'/login',loginModal)
}