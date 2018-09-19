/**
 * @param {*} currentList 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (currentList, newRoute) => {
    const {
        name,
        path,
        meta
    } = newRoute
    // 相当于复制了一个数组
    let newlist = [...currentList]
    if(name==='Home'){
        return newlist
    }
    if (newlist.findIndex(item => item.name === name) >= 0) {
        return newlist
    } else {
        newlist.push({
            name,
            path,
            meta
        })
    }
    return newlist
}
/** 
 * @param {*} tagName 要关闭的标签名
 * @description {*} 过滤掉关闭的标签名
 */
export const closeTags = (currentList,tagName) => {
    let newlist = [...currentList]
    newlist = newlist.filter((value) => {
        return value.name != tagName
    })
    return newlist
}

/** 
 * @param {*} tagName 要保留的标签名
 * @description {*} 关闭其他保留标签名
 */
export const keepTags = (currentList,tagName) => {
    let newlist = [...currentList]
    newlist = newlist.filter((value) => {
        return value.name === tagName
    })
    return newlist
}