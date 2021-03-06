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
                            <Button @click="handleSubMenu" :disabled="ifSubMenu">
                                <Icon type="md-add"></Icon>
                                <span>添加子菜单</span>
                            </Button>
                            <Button type="warning" @click="handleDeleteMenu" :disabled="ifDelete">
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
                                    <FormItem label="路径" prop="path">
                                        <Input v-model="systemForm.path"></Input>
                                    </FormItem>
                                    <FormItem label="排序" prop="sort">
                                        <InputNumber v-model="systemForm.sort"></InputNumber>
                                    </FormItem>
                                    <FormItem label="是否锁定">
                                        <i-switch size="large" v-model="systemForm.lock" />
                                    </FormItem>
                                    <FormItem label="是否展开">
                                        <i-switch size="large" v-model="systemForm.expand"/>
                                    </FormItem>
                                    <FormItem label="图标">
                                      <Input v-model="systemForm.icon" >
                                        <Icon slot="prepend" :type="systemForm.icon"></Icon>
                                        <Button class="appendBtn" @click="searchIcon" slot="append">搜索图标</Button>
                                      </Input>
                                    </FormItem>
                                    <Button type="primary" class="btn" @click="menuSubmit" :disabled="btnDisable">提交</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </Col>
        </Row>
        <Modal
            v-model="modalShow"
            :title="modalTitle"
            :mask-closable="maskClosable"
            :footer-hide="true">
            <div class="icon-group">
              <Row>
                <Col span="3" v-for="item of iconList">
                  <Button :icon="item" @click="botinIcon(item)"></Button>
                </Col>
              </Row>
            </div>
        </Modal>
    </div>
</template>

<script>
import { add, edit, deleteMenu, queryList } from "@/api/systemSet/menu.js";
import { initTree } from "@/libs/util.js";
import icons from "@/libs/icon.js";
export default {
  data() {
    return {
      isTop: false, // 是否为添加顶级菜单 false->添加子菜单
      ifSubMenu: false,
      ifDelete: false,
      isEdit: false, // 是否为编辑
      topOrSub: true,
      btnDisable: true, // 初始化页面是，禁用提交按钮
      modalShow: false, // 搜索图标弹出框是否展示
      modalTitle: "搜索图标",
      maskClosable: false,
      menuTitle: "菜单",
      currentId: "", // 当前选中菜单的ID
      menuTreeList: [],
      iconList: icons,
      systemForm: {
        parentId: 0,
        name: "",
        title: "",
        path: "",
        sort: 0,
        lock: false,
        expand: true,
        icon: ""
      },
      systemRules: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }]
      }
    };
  },
  mounted() {
    queryList().then(res => {
      let list = res;
      let tree = initTree(list);
      tree.forEach(item => {
        this.menuTreeList.push(item);
      });
    });
  },
  methods: {
    refreshTree() {
      let _this = this;
      _this.menuTreeList = [];
      queryList().then(res => {
        let list = res;
        let tree = initTree(list);
        tree.forEach(item => {
          _this.menuTreeList.push(item);
        });
      });
    },
    initData() {
      return {
        name: "",
        title: "",
        path: "",
        sort: 0,
        lock: false,
        expand: true,
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
          this.refreshTree();
          this.$Message.success("删除成功!");
        } else {
          this.$Message.success("删除失败!");
        }
      });
    },
    selectChange(params) {
      this.isEdit = true;
      this.ifDelete = false;
      this.btnDisable = false;
      let title = params[0].title;
      this.currentId = params[0].id;
      this.menuTitle = `正在编辑【${title}】`;
      if (params[0].lock) {
        this.ifDelete = true;
      }
      this.systemForm = {
        id: this.currentId,
        name: params[0].name,
        title: title,
        path: params[0].path,
        sort: params[0].sort,
        expand: params[0].expand,
        lock: params[0].lock,
        icon: params[0].icon
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
                this.refreshTree();
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
                this.refreshTree();
                this.$Message.success("提交成功!");
              } else {
                this.$Message.error("提交失败!");
              }
            });
          } else {
            edit(this.systemForm).then(res => {
              if (res.status === 200) {
                this.modalShow = false;
                this.refreshTree();
                this.$Message.success("提交成功!");
              } else {
                this.$Message.error("提交失败!");
              }
            });
          }
        }
      });
    },
    searchIcon() {
      this.modalShow = true;
    },
    botinIcon(item) {
      this.systemForm.icon = item;
      this.modalShow = false;
    }
  }
};
</script>


<style lang="less">
.icon-group {
  text-align: center;
  .ivu-col {
    margin: 4px;
  }
  .ivu-icon {
    font-size: 20px;
  }
}
</style>
