<style scoped lang="less">
@import "./fuction.less";
</style>
<style scoped>
.table >>> .ivu-poptip-inner {
  text-align: left;
}
</style>

<template>
    <div>
        <Form 
        class="search"
        :model="searchModel" 
        :label-width="80"
        inline>
            <FormItem label="模块名称">
                <Input type="text" v-model="searchModel.module" placeholder="模块模糊查询"></Input>
            </FormItem>
            <FormItem label="功能名称">
                <Input type="text" v-model="searchModel.name" placeholder="功能模糊查询"></Input>
            </FormItem>
            <FormItem label="功能编码">
                <Input type="text" v-model="searchModel.code" placeholder="编码模糊查询"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="query">查询</Button>
                <Button style="margin-left: 8px" @click="empty">清空</Button>
            </FormItem>
        </Form>
        <div class="table">
            <div class="btn">
                <Button type="primary" @click="add">新增</Button>
                <Button style="margin-left: 8px" :disabled="disabled">删除</Button>
            </div>
            <Table border 
            ref="selection" 
            :columns="funColumns" 
            :data="funData"
            @on-select="handleSelect"
            @on-select-all="handleSelectAll"
            @on-selection-change="handleSelectChange"
            ></Table>
            <div class="pages">
              <Page class="pull-right" 
              :total="pageTotal" 
              :current="currentPage" 
              show-sizer
              :page-size = "pageSize"
              :show-total="showTatal"
              @on-change="handlePage"
              :page-size-opts = "pageSizeOpt"
              @on-page-size-change = "handlePageSize"
               />
            </div>
        </div>
        <Modal
            v-model="modalShow"
            :title="modalTitle"
            :mask-closable="maskClosable">
            <Form
            ref="funModel"
            :model="funModel"
            :label-width="80"
            :rules="funRules"
            style="width:400px;">
                <FormItem label="功能名称" prop="name">
                    <Input type="text" v-model="funModel.name"></Input>
                </FormItem>
                <FormItem label="功能编码" prop="code">
                    <Input type="text" v-model="funModel.code"></Input>
                </FormItem>
                <FormItem label="功能描述">
                    <Input v-model="funModel.description" type="textarea" placeholder="Enter something..." />
                </FormItem>
                <FormItem label="模块" prop="module">
                    <Cascader :data="moduleList" v-model="funModel.module"></Cascader>
                </FormItem>
            </Form>
            <div slot="footer">
              <Button @click="handleCancel">关闭</Button>
              <Button type="info" @click="handleSubmit">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { queryList as queryMenuList } from "../../../api/systemSet/menu.js";
import {
  add,
  queryList,
  deleteFunc,
  edit
} from "../../../api/authManage/function.js";
export default {
  data() {
    return {
      searchModel: {},
      modalShow: false,
      modalTitle: "",
      showTatal: true,
      maskClosable: false,
      disabled: true,
      pageTotal: 0,
      currentPage: 1,
      pageSize: 5,
      pageSizeOpt: [2, 5, 10],
      funModel: {},
      funRules: {
        name: [
          {
            required: true,
            message: "功能名称不能为空",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "功能编码不能为空",
            trigger: "blur"
          }
        ],
        module: [
          {
            required: true,
            message: "模块不能为空"
          }
        ]
      },
      treeShow: false,
      funColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "模块名称",
          key: "module",
          sortable: true
        },
        {
          title: "功能名称",
          key: "name",
          sortable: true
        },
        {
          title: "功能编码",
          key: "code",
          sortable: true
        },
        {
          title: "操作",
          key: "opetation",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    title: "你确定要删除该条信息吗?"
                  },
                  on: {
                    "on-ok": () => {
                      this.remove(params);
                    }
                  }
                },
                [h("a", {}, "删除")]
              )
            ]);
          }
        }
      ],
      funData: [],
      moduleList: [
        {
          value: "System",
          label: "系统",
          children: [
            {
              value: "SystemSet",
              label: "系统设置",
              children: [
                {
                  value: "MenuManage",
                  label: "菜单管理"
                }
              ]
            },
            {
              value: "AuthManage",
              label: "权限管理",
              children: [
                {
                  value: "Function",
                  label: "功能管理"
                },
                {
                  value: "Role",
                  label: "角色管理"
                },
                {
                  value: "RoleAuth",
                  label: "角色权限管理"
                },
                {
                  value: "RoleUser",
                  label: "角色用户管理"
                },
                {
                  value: "UserRole",
                  label: "用户角色管理"
                }
              ]
            },
            {
              value: "OrgStructure",
              label: "组织构架",
              children: [
                {
                  value: "DepManage",
                  label: "部门管理"
                },
                {
                  value: "PosManage",
                  label: "职位管理"
                }
              ]
            },
            {
              value: "UserManage",
              label: "用户管理",
              children: [
                {
                  value: "UserManage",
                  label: "用户管理"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  mounted() {
    let params = {
      pageSize: this.pageSize,
      currentPage: this.currentPage,
      sortBy: "",
      descending: "",
      filter: this.searchModel
    };
    queryList(params).then(res => {
      this.funData = res.list;
      this.pageTotal = res.count;
    });
    queryMenuList().then(res => {
      let list = res;
      let model = list.filter(father => {
        let branchArr = list.filter(child => {
          return father.id === child.parentId;
        });
        if (branchArr.length > 0) {
          father.children = branchArr;
        }
        return father.parentId == 0;
      });
      function moduleInfo(model) {
        let modalList = model.map(item => {
          item.value = item.title;
          item.label = item.title;
          item.moduleID = item.id;
          if (item.children) {
            moduleInfo(item.children);
          }
          return item;
        });
        return modalList;
      }
      this.moduleList = moduleInfo(model);
    });
  },
  methods: {
    query() {
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        sortBy: "",
        descending: "",
        filter: this.searchModel
      };
      queryList(params).then(res => {
        this.funData = res.list;
        this.pageTotal = res.count;
      });
    },
    empty() {
      this.searchModel = {};
    },
    add() {
      this.modalTitle = "新增功能";
      this.modalShow = true;
      this.funModel = {};
    },
    edit(rowInfo) {
      this.modalTitle = "编辑功能";
      this.modalShow = true;
      this.funModel = rowInfo;
    },
    remove(params) {
      // 删除table行信息
      deleteFunc(params.row.id).then(res => {
        if (res.status === 200) {
          this.funData.splice(params.index, 1);
          this.$Message.success("删除成功!");
        } else {
          this.$Message.success("删除失败!");
        }
      });
    },
    handleCancel() {
      this.modalShow = false;
    },
    handleSubmit() {
      this.$refs["funModel"].validate(valid => {
        if (valid) {
          let model = this.funModel;
          this.modalShow = false;
          if (this.modalTitle === "新增功能") {
            add(model).then(res => {
              if (res.status === 200) {
                this.modalShow = false;
                this.funData.push(model);
                this.$Message.success("提交成功!");
              } else {
                this.$Message.error("提交失败!");
              }
            });
          } else {
            edit(model).then(res => {
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
    },
    handlePageSize(page) {
      this.pageSize = page;
      let params = {
        pageSize: page,
        currentPage: this.currentPage,
        sortBy: "",
        descending: "",
        filter: this.searchModel
      };
      queryList(params).then(res => {
        this.funData = res.list;
        this.pageTotal = res.count;
      });
    },
    handlePage(page) {
      let params = {
        pageSize: this.pageSize,
        currentPage: page,
        sortBy: "",
        descending: "",
        filter: this.searchModel
      };
      queryList(params).then(res => {
        this.funData = res.list;
        this.pageTotal = res.count;
      });
    },
    handleSelect(param) {
      // param 数组
      let select = param;
    },
    handleSelectAll(param) {
      // param 数组
      let select = param;
    },
    handleSelectChange(param) {
      if (param.length === 0) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    }
  }
};
</script>

