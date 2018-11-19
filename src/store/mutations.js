 import {
     setTagCookie
 } from '../libs/util.js'
 /**
  * @param {*} tagList 更新的tags列表
  * @description 更新tags列表
  */
 export default {
     updateTagList(state, tagList) {
         state.tagList = tagList
         setTagCookie(tagList)
     },
     /**
      * @param {*} isCollapsed
      * @description 处理侧边栏收缩展开问题
      */
     collapsedMenu(state, isCollapsed) {
         state.isCollapsed = isCollapsed
     }
 }