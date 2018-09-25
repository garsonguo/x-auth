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
    name:'AuthManage',
    title: '权限管理',
    icon: 'ios-construct',
    children: [{
        id: '3-1',
        name: 'Function',
        title: '功能管理',
        icon: 'ios-arrow-forward',
        path: '/AuthManage/Function'
    },{
        id: '3-2',
        name:'Role',
        title: '角色管理',
        icon: 'ios-arrow-forward',
        path: '/AuthManage/Role'
    },{
        id: '3-3',
        name:'RoleAuth',
        title: '角色权限管理',
        icon: 'ios-arrow-forward',
        path: '/AuthManage/RoleAuth'
    },{
        id: '3-4',
        name:'RoleUser',
        title: '角色用户管理',
        icon: 'ios-arrow-forward',
        path: '/AuthManage/RoleUser'
    },{
        id: '3-5',
        name:'UserRole',
        title: '用户角色管理',
        icon: 'ios-arrow-forward',
        path: '/AuthManage/UserRole'
    }]
},{
    id:'4',
    title: '组织构架',
    name:'OrgStructure',
    icon: 'ios-person-add',
    children: [{
        id: '4-1',
        name:'DepManage',
        title: '部门管理',
        icon: 'ios-arrow-forward',
        path: '/OrgStructure/DepManage'
    },{
        id: '4-2',
        name:'PosManage',
        title: '职位管理',
        icon: 'ios-arrow-forward',
        path: '/OrgStructure/PosManage'
    }]
},{
    id:'5',
    title: '用户管理',
    name:'UserManage',
    icon: 'ios-people',
    children: [{
        id: '5-1',
        name:'UserManage',
        title: '用户管理',
        icon: 'ios-arrow-forward',
        path: '/UserManage/UserManage'
    }]
}]