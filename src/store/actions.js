import {
    login
} from '../api/userManage/user.js'
import {
    setToken,
    setUserInfo
} from '../libs/auth.js'
import {} from './mutations'

export default {
    /**
     * @param {*} 登录model
     * @description 处理登录
     */
    handleLogin({
        commit
    }, formLogin) {
        return new Promise((resolve, reject) => {
            login(formLogin).then(res => {
                if (res.status === 200) {
                    setUserInfo(formLogin) // 将用户信息存储到cookie中
                    setToken('x-auth') // 设置token
                    resolve(true)
                } else {
                    reject(res)
                }
            })
        })
    }
}