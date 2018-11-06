<style scoped lang="less">
@import "./userManage.less";
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
            <FormItem label="账号名称">
                <Input type="text" v-model="searchModel.account" placeholder="账号名称查询"></Input>
            </FormItem>
            <FormItem label="用户邮箱">
                <Input type="text" v-model="searchModel.email" placeholder="用户邮箱查询"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="query">查询</Button>
                <Button style="margin-left: 8px" @click="empty">清空</Button>
            </FormItem>
        </Form>
        <div class="table">
            <div class="btn">
                <Button type="primary" @click="add">新增</Button>
                <Button style="margin-left: 8px" :disabled="disabled" @click="removeAll">删除</Button>
            </div>
            <Table border 
            ref="selection" 
            :columns="userManageColumns" 
            :data="userManageData"
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
            ref="userManageModel"
            :model="userManageModel"
            :label-width="80"
            :rules="userManageRules"
            style="width:400px;">
                <FormItem label="账号名称" prop="account">
                    <Input type="text" :disabled="adminDis" v-model="userManageModel.account"></Input>
                </FormItem>
                <FormItem label="用户名称" prop="name">
                    <Input type="text" :disabled="adminDis" v-model="userManageModel.name"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input type="text" v-model="userManageModel.password"></Input>
                </FormItem>
                <FormItem label="用户邮箱" prop="email">
                    <Input type="text" v-model="userManageModel.email"></Input>
                </FormItem>
                <FormItem label="电话号码" prop="phone">
                    <Input type="text" v-model="userManageModel.phone"></Input>
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
import {
  registered,
  queryUserList,
  deleteUser,
  editUser
} from "../../api/user.js";
export default {
  data() {
    return {
      searchModel: {},
      modalShow: false,
      modalTitle: "",
      showTatal: true,
      pageSizeOpt: [2, 5, 10],
      maskClosable: false,
      disabled: true,
      adminDis: false,
      pageTotal: 0,
      currentPage: 1,
      pageSize: 5,
      userManageModel: {},
      userManageRules: {
        account: [
          {
            required: true,
            message: "账号名称不能为空",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "用户名称不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ],
        email: [
          {
            type: "email",
            message: "email格式不对",
            trigger: "blur"
          }
        ]
      },
      treeShow: false,
      userManageColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "账号名称",
          key: "account",
          sortable: true
        },
        {
          title: "用户名称",
          key: "name",
          sortable: true
        },
        {
          title: "用户邮箱",
          key: "email",
          sortable: true
        },
        {
          title: "电话号码",
          key: "phone",
          sortable: true
        },
        {
          title: "操作",
          key: "opetation",
          width: 150,
          align: "center",
          render: (h, params) => {
            if (this.userManageData[params.index].name === "admin") {
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
                )
              ]);
            } else {
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
        }
      ],
      userManageData: []
    };
  },
  mounted() {
    let params = {
      pageSize: this.pageSize,
      currentPage: this.currentPage,
      sortBy: "",
      descending: "",
      filter: ""
    };
    queryUserList(params).then(res => {
      this.userManageData = res.list;
      this.pageTotal = res.count;
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
      queryUserList(params).then(res => {
        this.userManageData = res.list;
        this.pageTotal = res.count;
      });
    },
    empty() {
      this.searchModel = {};
    },
    removeAll() {},
    add() {
      this.adminDis = false;
      this.modalTitle = "新增功能";
      this.modalShow = true;
      this.userManageModel = {};
    },
    edit(rowInfo) {
      this.modalTitle = "编辑功能";
      if (rowInfo.name === "admin") {
        this.adminDis = true;
      } else {
        this.adminDis = false;
      }
      this.modalShow = true;
      this.userManageModel = rowInfo;
    },
    remove(params) {
      // 删除table行信息
      deleteUser(params.row.id).then(res => {
        if (res.status === 200) {
          this.userManageData.splice(params.index, 1);
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
      this.$refs["userManageModel"].validate(valid => {
        if (valid) {
          let model = this.userManageModel;
          if (this.modalTitle === "新增功能") {
            registered(model).then(res => {
              if (res.status === 200) {
                this.modalShow = false;
                this.userManageData.push(model);
                this.$Message.success("提交成功!");
              } else {
                this.$Message.error("提交失败!");
              }
            });
          } else {
            editUser(model).then(res => {
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
      queryUserList(params).then(res => {
        this.userManageData = res.list;
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
      queryUserList(params).then(res => {
        this.userManageData = res.list;
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

