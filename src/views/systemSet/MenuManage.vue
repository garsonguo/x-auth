<style scoped lang="less">
@import "./menuManage.less";
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
                                <Form ref="systemForm" :model="systemForm" :rules="systemRules" :label-width="100">
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
                                    <Button type="primary" class="btn" @click="menuSubmit" :disabled="btnDisable">提交</Button>
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
import { add, edit, deleteMenu } from "../../api/systemSet/menu.js";
export default {
  data() {
    return {
      isTop: false, // 是否为添加顶级菜单 false->添加子菜单
      subDis: false,
      isEdit: false, // 是否为编辑
      topOrSub: true,
      btnDisable: true, // 初始化页面是，禁用提交按钮
      menuTitle: "菜单",
      currentId: "", // 当前选中菜单的ID
      menuTreeList: [
        {
          title: "系统",
          expand: true,
          children: [
            {
              id: "1",
              title: "系统设置",
              children: [
                {
                  id: "1-1",
                  title: "菜单管理"
                }
              ]
            },
            {
              title: "权限管理",
              id: "2",
              children: [
                {
                  id: "2-1",
                  title: "功能管理"
                },
                {
                  id: "2-2",
                  title: "角色管理"
                },
                {
                  id: "2-3",
                  title: "角色权限管理"
                },
                {
                  id: "2-4",
                  title: "角色用户管理"
                },
                {
                  id: "2-5",
                  title: "用户角色管咯"
                }
              ]
            },
            {
              title: "组织构架",
              id: "3",
              children: [
                {
                  id: "3-1",
                  title: "部门管理"
                },
                {
                  id: "3-2",
                  title: "职位管理"
                }
              ]
            },
            {
              title: "用户管理",
              id: "4",
              children: [
                {
                  id: "4-1",
                  title: "用户管理"
                }
              ]
            }
          ]
        }
      ],
      iconList: [
        {
          value: "icon-fa",
          label: "icon-fa"
        }
      ],
      systemForm: {
        parentId: 0,
        name: "",
        title: "",
        authCode: "",
        sort: 0,
        leftShow: false,
        lock: true,
        icon: ""
      },
      systemRules: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    initData() {
      return {
        name: "",
        title: "",
        authCode: "",
        sort: 0,
        leftShow: false,
        lock: true,
        icon: ""
      };
    },
    handleTopMenu() {
      this.isTop = true;
      this.btnDisable = false;
      this.subDis = !this.subDis;
      this.isEdit = false;
      this.menuTitle = "正在添加顶级菜单";
      this.systemForm = this.initData();
    },
    handleSubMenu() {
      this.isTop = false;
      this.isEdit = false;
      this.menuTitle = "正在添加子级菜单";
      this.systemForm = this.initData();
    },
    handleDeleteMenu() {
      deleteMenu(this.currentId).then(res => {
        if (res.status === 200) {
          //   this.menuTreeList.splice(params.index, 1);
          this.$Message.success("删除成功!");
        } else {
          this.$Message.success("删除失败!");
        }
      });
    },
    selectChange(params) {
      this.isEdit = true;
      this.subDis = false;
      this.btnDisable = false;
      let title = params[0].title;
      this.currentId = params[0].id;
      this.menuTitle = `正在编辑【${title}】`;
      this.systemForm = {
        id: this.currentId,
        name: title,
        title: title,
        authCode: 1,
        sort: 0,
        leftShow: true,
        lock: true,
        icon: "icon-fa"
      };
    },
    menuSubmit() {
      this.$refs.systemForm.validate(valid => {
        if (valid) {
          if (this.isTop && !this.isEdit) {
            this.systemForm.parentId = 0;
            add(this.systemForm).then(res => {
              if (res.status === 200) {
                this.modalShow = false;
                this.menuTreeList.push(res.data.result);
                this.$Message.success("提交成功!");
              } else {
                this.$Message.error("提交失败!");
              }
            });
          } else if (!this.isTop && !this.isEdit) {
            this.systemForm.parentId = this.currentId;
            add(this.systemForm).then(res => {
              if (res.status === 200) {
                this.modalShow = false;
                this.menuTreeList.push(res.data.result);
                this.$Message.success("提交成功!");
              } else {
                this.$Message.error("提交失败!");
              }
            });
          } else {
            debugger;
            edit(this.systemForm).then(res => {
              if (res.status === 200) {
                this.modalShow = false;
                this.$Message.success("提交成功!");
              } else {
                this.$Message.error("提交失败!");
              }
            });
          }
        }
      });
    }
  }
};
</script>
