<style scoped lang="less">
@import './menuManage.less';
</style>

<template>
    <div class="menu-manage">
        <Row :gutter="16">
            <Col span="6">
                <div class="left">
                    <Card>
                        <p slot="title">
                            <Icon type="ios-film-outline"></Icon>
                            菜单树
                        </p>
                        <div class="btn-top">
                            <Button type="primary" @click="handleTopMenu">
                                <Icon type="md-add"></Icon>
                                <span>添加顶级菜单</span>
                            </Button>
                            <Button @click="handleSubMenu" :disabled="subDis">
                                <Icon type="md-add"></Icon>
                                <span>添加子菜单</span>
                            </Button>
                            <Button type="warning" @click="handleDeleteMenu" :disabled="subDis">
                                <Icon type="ios-trash" />
                                <span>删除选中菜单</span>
                            </Button>
                        </div>
                        <div class="menu-tree">
                            <Tree 
                            :data="menuTreeList" 
                            @on-select-change="selectChange"
                            ></Tree>
                        </div>
                    </Card>
                </div>
            </Col>
            <Col span="18">
                <div class="system">
                    <Card>
                        <p slot="title">
                            <Icon type="ios-film-outline"></Icon>
                            {{menuTitle}}
                        </p>
                        <Row>
                            <Col span="12">
                                <Form :model="systemForm" :rules="systemRules" :label-width="100">
                                    <FormItem label="名称" prop="name">
                                        <Input v-model="systemForm.name"></Input>
                                    </FormItem>
                                    <FormItem label="标题" prop="title">
                                        <Input v-model="systemForm.title"></Input>
                                    </FormItem>
                                    <FormItem label="权限码" prop="authCode">
                                        <Input v-model="systemForm.authCode"></Input>
                                    </FormItem>
                                    <FormItem label="排序" prop="sort">
                                        <InputNumber v-model="systemForm.sort"></InputNumber>
                                    </FormItem>
                                    <FormItem label="是否左侧显示">
                                        <i-switch size="large" v-model="systemForm.leftShow" />
                                    </FormItem>
                                    <FormItem label="是否锁定">
                                        <i-switch size="large" v-model="systemForm.lock"/>
                                    </FormItem>
                                    <FormItem label="图标">
                                        <Select v-model="systemForm.icon">
                                            <Option v-for="item in iconList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </FormItem>
                                    <Button type="primary" class="btn">提交</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                subDis: false,
                topOrSub: true,
                menuTitle: '菜单',
                menuTreeList:[{
                    title: '系统',
                    expand: true,
                    children:[{
                        title:'系统设置',
                        children: [{
                            title:'菜单管理'
                        }]
                    },{
                        title:'权限管理',
                        children: [{
                            title:'功能管理'
                        },{
                            title:'角色管理'
                        },{
                            title:'角色权限管理'
                        },{
                            title:'角色用户管理'
                        },{
                            title:'用户角色管咯'
                        }]
                    },{
                        title:'组织构架',
                        children: [{
                            title:'部门管理'
                        },{
                            title:'职位管理'
                        }]
                    },{
                        title:'用户管理',
                        children: [{
                            title:'用户管理'
                        }]
                    }]
                }],
                iconList: [{
                    value: 'icon-fa',
                    label: 'icon-fa'
                }],
                systemForm: {
                    name: '',
                    title: '',
                    authCode: '',
                    sort: 0,
                    leftShow: false,
                    lock: true,
                    icon: ''
                },
                systemRules:{
                    name:[{ required: true, message: '名称不能为空', trigger: 'blur' }],
                    title:[{ required: true, message: '标题不能为空', trigger: 'blur' }]
                }
            }
        },
        methods: {
            handleTopMenu() {
                this.subDis = !this.subDis
                this.menuTitle = '正在添加顶级菜单'
            },
            handleSubMenu() {
                this.menuTitle = '正在添加子级菜单'
            },
            handleDeleteMenu() {},
            selectChange(params) {
                let title = params[0].title
                this.menuTitle = `正在编辑【${title}】`
                this.systemForm = {
                    name: title,
                    title: title,
                    authCode: 1,
                    sort: 0,
                    leftShow: true,
                    lock: true,
                    icon: 'icon-fa'
                }
            }
        }
    }
</script>
