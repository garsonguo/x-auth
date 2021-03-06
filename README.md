# x-auth

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```
### 问题记录与开发创建步骤
1. 创建与初始化项目
    + 1.1. 全局安装脚手架npm install -g @vue/cli，vue-cli3
    + 1.2. git新建仓库，clone到本地，创建项目vue create x-auth，覆盖掉本地仓库；
    + 1.3. vue-cli3官网：https://cli.vuejs.org/zh/guide/
    + 1.4. vue ui 启动VUE项目管理页，可以在里面管理你的项目
2. vue-cli3 配置详解：https://www.cnblogs.com/zjhr/p/9472648.html
    + 修改路径别名：https://segmentfault.com/a/1190000016135314 
3. 引入iview https://www.iviewui.com/docs/guide/install
    + 3.1. 按需引入导致iview not defined https://www.jianshu.com/p/0520f4775456
    + 3.2. vscode中iview的标签报错 x-invalid-end-tag 关掉vetur.validation.template:       https://blog.csdn.net/weixin_38278878/article/details/80447503
关闭就好，别手贱，这个看看就好，按照这个弄，我环境就崩了:https://segmentfault.com/q/1010000013227727?utm_source=tag-newest
4. 引入css预编译器   Vue CLI 项目天生支持 PostCSS、CSS Modules 和包含 Sass、Less、Stylus 在内的预处理器，只需安装即可
    + 4.1. https://cli.vuejs.org/zh/guide/css.html#%E5%BC%95%E7%94%A8%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90
5. VsCode读取项目文件的Eslint规则 保存时自动修复格式错误：https://juejin.im/post/5b9dee8ff265da0afe62d1dd
6. 如何判断DOM已经渲染完毕：https://segmentfault.com/q/1010000011207184
7. 树形下拉框：https://vue-treeselect.js.org/
8. iview在table中使用poptip：https://blog.csdn.net/yhy0901/article/details/81033181
9. 局部变量如何穿透局部到全局，参照路径：/Users/xiaobog/Desktop/xiaobog/x-auth/src/views/authManage/function/Function.vue
10. iview异步加载树时，注意执行顺序，默认打开三级以上菜单时，openName为Submenu name数组
11. 百度地图：https://github.com/Dafrok/vue-baidu-map
