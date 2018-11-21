export default [{
    expand: true,
    icon: 'ios-navigate',
    id: 'b56a1c36-03dd-4c71-b83f-b607db1597c5',
    lock: false,
    name: 'Home',
    title: '首页',
    path: '/Home'
}, {
    expand: true,
    icon: 'icon-fa',
    id: '1ea5a612-d309-421e-ad6a-b8ef4f520795',
    lock: false,
    name: 'System',
    title: '系统',
    path: '',
    children: [{
        expand: true,
        icon: 'icon-fa',
        id: 'fc7f2248-2d59-4804-a778-1265d51fda55',
        lock: false,
        name: 'SystemSet',
        title: '系统设置',
        path: '',
        children: [{
            expand: true,
            icon: 'icon-fa',
            id: '3092f266-5347-44cb-a69d-84372c6425d9',
            lock: false,
            name: 'MenuManage',
            title: '菜单管理',
            path: '/System/SystemSet/MenuManage',
        }]
    }]
}]