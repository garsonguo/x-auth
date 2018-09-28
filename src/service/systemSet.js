import request from '../libs/request.js'

export const saveMenu = (menuInfo) => {
    return request({
        url: '/saveMenu',
        method: 'post',
        data: menuInfo
    })
}