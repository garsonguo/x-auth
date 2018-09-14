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
1.1. 全局安装脚手架npm install -g @vue/cli，vue-cli3
1.2. git新建仓库，clone到本地，创建项目vue create x-auth，覆盖掉本地仓库；
1.3. vue-cli3官网：https://cli.vuejs.org/zh/guide/
1.4. vue ui 启动VUE项目管理页，可以在里面管理你的项目
2. vue-cli3中的配置文件 vue.config.js
2.1. 
3. 引入iview https://www.iviewui.com/docs/guide/install
3.1. 按需引入导致iview not defined https://www.jianshu.com/p/0520f4775456
3.2. vscode中iview的标签报错 x-invalid-end-tag 关掉vetur.validation.template: https://blog.csdn.net/weixin_38278878/article/details/80447503
关闭就好，别手贱，这个看看就好，按照这个弄，我环境就崩了:https://segmentfault.com/q/1010000013227727?utm_source=tag-newest
4. 引入css预编译器   Vue CLI 项目天生支持 PostCSS、CSS Modules 和包含 Sass、Less、Stylus 在内的预处理器，只需安装即可
4.1. https://cli.vuejs.org/zh/guide/css.html#%E5%BC%95%E7%94%A8%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90