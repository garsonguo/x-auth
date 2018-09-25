export default [{
    id: '1',
    name: 'Home',
    title: '首页',
    icon: 'ios-navigate',
    path: '/Home'
}, {
    id: '2',
    name: 'SystemSet',
    title: '系统设置',
    icon: 'ios-cog',
    children: [{
        id: '2-1',
        name: 'MenuManage',
        title: '菜单管理',
        icon: 'ios-arrow-forward',
        path: '/SystemSet/MenuManage'
    }]
},{
    id:'3',
    name:'',
    title: '权限管理',
    icon: 'ios-construct',
    children: [{
        id: '3-1',
        name: '',
        title: '功能管理',
        icon: 'ios-arrow-forward',
        path: ''
    },{
        id: '3-2',
        name:'',
        title: '角色管理',
        icon: 'ios-arrow-forward',
        path: ''
    },{
        id: '3-3',
        name:'',
        title: '角色权限管理',
        icon: 'ios-arrow-forward',
        path: ''
    },{
        id: '3-4',
        name:'',
        title: '角色用户管理',
        icon: 'ios-arrow-forward',
        path: ''
    },{
        id: '3-5',
        name:'',
        title: '用户角色管理',
        icon: 'ios-arrow-forward',
        path: ''
    }]
},{
    id:'4',
    title: '组织构架',
    name:'',
    icon: 'ios-person-add',
    children: [{
        id: '4-1',
        name:'',
        title: '部门管理',
        icon: 'ios-arrow-forward',
        path: ''
    },{
        id: '4-2',
        name:'',
        title: '职位管理',
        icon: 'ios-arrow-forward',
        path: ''
    }]
},{
    id:'5',
    title: '用户管理',
    name:'',
    icon: 'ios-people',
    children: [{
        id: '5-1',
        name:'',
        title: '用户管理',
        icon: 'ios-arrow-forward',
        path: ''
    }]
}]