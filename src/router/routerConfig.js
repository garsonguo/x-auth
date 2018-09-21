export default [{
    id: '1',
    name: '首页',
    icon: 'ios-navigate',
    path: '/Home'
}, {
    id: '2',
    name: '系统设置',
    icon: 'ios-cog',
    children: [{
        id: '2-1',
        name: '菜单管理',
        icon: 'ios-arrow-forward',
        path: '/SystemSet/MenuManage'
    }]
},{
    id:'3',
    name: '权限管理',
    icon: 'ios-construct',
    children: [{
        id: '3-1',
        name: '功能管理',
        icon: 'ios-arrow-forward',
        path: ''
    },{
        id: '3-2',
        name: '角色管理',
        icon: 'ios-arrow-forward',
        path: ''
    },{
        id: '3-3',
        name: '角色权限管理',
        icon: 'ios-arrow-forward',
        path: ''
    },{
        id: '3-4',
        name: '角色用户管理',
        icon: 'ios-arrow-forward',
        path: ''
    },{
        id: '3-5',
        name: '用户角色管理',
        icon: 'ios-arrow-forward',
        path: ''
    }]
},{
    id:'4',
    name: '组织构架',
    icon: 'ios-person-add',
    children: [{
        id: '4-1',
        name: '部门管理',
        icon: 'ios-arrow-forward',
        path: ''
    },{
        id: '4-2',
        name: '职位管理',
        icon: 'ios-arrow-forward',
        path: ''
    }]
},{
    id:'5',
    name: '用户管理',
    icon: 'ios-people',
    children: [{
        id: '5-1',
        name: '用户管理',
        icon: 'ios-arrow-forward',
        path: ''
    }]
}]