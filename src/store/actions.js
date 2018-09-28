import { login } from '../api/user.js'
import { setToken, setUserInfo } from '../libs/auth.js'

export default {
     /**
     * @param {*} 登录model
     * @description 处理登录
     */
    handleLogin({commit},formLogin) {
        return new Promise((resolve, reject) => {
            login(formLogin).then(res => {
                if(res.status === 200) {
                    setUserInfo(formLogin)
                    setToken('x-auth')
                    resolve(true)
                }else{
                    reject(res)
                }
            })
        })
    }
}