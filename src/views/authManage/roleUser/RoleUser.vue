<template>
    <div>
        <Form 
        class="search"
        :model="searchModel" 
        :label-width="80"
        inline>
            <FormItem label="角色名称">
                <Input type="text" v-model="searchModel.name" placeholder="名称模糊查询"></Input>
            </FormItem>
            <FormItem label="角色编码">
                <Input type="text" v-model="searchModel.code" placeholder="编码模糊查询"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="query">查询</Button>
                <Button style="margin-left: 8px" @click="empty">清空</Button>
            </FormItem>
        </Form>
        <div class="table">
            <Table border 
            ref="selection" 
            :columns="roleColumns" 
            :data="roleData"
            @on-select="handleSelect"
            @on-select-all="handleSelectAll"
            @on-selection-change="handleSelectChange"
            ></Table>
            <div class="pages">
              <Page class="pull-right" 
              :total = "pageTotal" 
              :current = "currentPage" 
              show-sizer
              :page-size = "pageSize"
              :show-total = "showTatal"
              @on-change = "handlePage"
              :page-size-opts = "pageSizeOpt"
              @on-page-size-change = "handlePageSize"
               />
            </div>
        </div>
        <Modal
            width="1000"
            v-model="modalShow"
            :title="modalTitle"
            :mask-closable="maskClosable">
            <Form 
            class="search"
            :model="userListModel" 
            :label-width="80"
            inline>
                <FormItem label="账号名称">
                    <Input type="text" v-model="userListModel.account" placeholder="账号名称查询"></Input>
                </FormItem>
                <FormItem label="用户邮箱">
                    <Input type="text" v-model="userListModel.email" placeholder="用户邮箱查询"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="queryUser">查询</Button>
                    <Button style="margin-left: 8px" @click="emptyUser">清空</Button>
                </FormItem>
            </Form>
            <Table 
            border
            :columns="userListColumns" 
            :data="userListData"
            ></Table>
            <div class="pages">
              <Page class="pull-right" 
              :total = "pageTotalUser" 
              :current = "currentPageUser" 
              show-sizer
              :page-size = "pageSizeUser"
              :show-total = "showTatal"
              @on-change = "handlePageUser"
              :page-size-opts = "pageSizeOpt"
              @on-page-size-change = "handlePageSizeUser"
               />
            </div>
            <div slot="footer">
              <Button @click="handleCancel">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import {
  queryList,
  deleteRole,
  edit,
  roleAddUser as add,
  queryRoleUser,
  deleteRoleUser
} from "@/api/authManage/role.js";
import { queryUserList } from "@/api/userManage/user.js";
export default {
  data() {
    return {
      searchModel: {},
      disabled: true,
      showTatal: true,
      modalShow: false,
      maskClosable: false,
      modalTitle: "",
      pageTotal: 0,
      currentPage: 1,
      pageSize: 5,
      pageSizeOpt: [2, 5, 10],
      pageTotalUser: 0,
      currentPageUser: 1,
      pageSizeUser: 5,
      roleId: "",
      roleModel: {},
      roleColumns: [
        {
          title: "角色名称",
          key: "name",
          sortable: true
        },
        {
          title: "角色编码",
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
                "用户列表"
              )
            ]);
          }
        }
      ],
      roleData: [],
      userListModel: {},
      userListColumns: [
        {
          title: "账号名称",
          key: "account"
        },
        {
          title: "用户名称",
          key: "name"
        },
        {
          title: "用户邮箱",
          key: "email"
        },
        {
          title: "电话",
          key: "phone"
        },
        {
          title: "添加状态",
          key: "status"
        },
        {
          title: "操作",
          key: "opetation",
          width: 150,
          align: "center",
          render: (h, params) => {
            if (params.row.status === "添加") {
              return h("div", [
                h(
                  "a",
                  {
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.roleRemoveUser(params);
                      }
                    }
                  },
                  "移除"
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
                        this.roleAddUser(params);
                      }
                    }
                  },
                  "添加"
                )
              ]);
            }
          }
        }
      ],
      userListData: []
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
      this.roleData = res.list;
      this.pageTotalUser = res.count;
    });
  },
  methods: {
    async initUserList() {
      let params = {
        pageSize: this.pageSizeUser,
        currentPage: this.currentPageUser,
        sortBy: "",
        descending: "",
        filter: this.userListModel
      };
      let uparams = {
        roleId: this.roleId
      };
      let roleUser = await queryRoleUser(uparams);
      let userList = await queryUserList(params);
      let list = userList.list.map(user => {
        let ids = roleUser.data.result;
        user.status = "消除";
        ids.forEach(item => {
          if (item.userId === user.id) {
            user.status = "添加";
          }
        });
        return user;
      });
      this.userListData = list;
    },
    query() {
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        sortBy: "",
        descending: "",
        filter: this.searchModel
      };
      queryList(params).then(res => {
        this.roleData = res.list;
        this.pageTotal = res.count;
      });
    },
    empty() {
      this.searchModel = {};
    },
    queryUser() {
      this.initUserList();
    },
    emptyUser() {
      this.userListModel = {};
    },
    edit(rowInfo) {
      this.roleId = rowInfo.id;
      this.modalTitle = "用户列表";
      this.modalShow = true;
      this.initUserList();
    },
    roleAddUser(params) {
      let ids = {
        roleId: this.roleId,
        userId: params.row.id
      };
      add(ids).then(res => {
        if (res.status == 200) {
          let statue = this.userListData[params.index].status;
          if (statue === "消除") {
            params.row.status = "添加";
            this.$set(this.userListData, params.index, params.row);
          } else {
            params.row.status = "消除";
            this.$set(this.userListData, params.index, params.row);
          }
          this.$Message.success("添加成功!");
        } else {
          this.$Message.error("添加失败!");
        }
      });
    },
    roleRemoveUser(params) {
      let ids = {
        roleId: this.roleId,
        userId: params.row.id
      };
      deleteRoleUser(ids).then(res => {
        if (res.status == 200) {
          let statue = this.userListData[params.index].status;
          if (statue === "消除") {
            params.row.status = "添加";
            this.$set(this.userListData, params.index, params.row);
          } else {
            params.row.status = "消除";
            this.$set(this.userListData, params.index, params.row);
          }
          this.$Message.success("添加成功!");
        } else {
          this.$Message.error("添加失败!");
        }
      });
    },
    handleSelectChange(param) {},
    handleSelect() {},
    handleSelectAll() {},
    handleCancel() {
      this.modalShow = false;
    },
    getSelectedNodes() {},
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
        this.roleData = res.list;
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
        this.roleData = res.list;
        this.pageTotal = res.count;
      });
    },
    handlePageSizeUser(page) {
      this.pageSizeUser = page;
      this.initUserList();
    },
    handlePageUser(page) {
      this.currentPageUser = page;
      this.initUserList();
    }
  }
};
</script>

<style scoped lang="less">
@import "./roleUser.less";
</style>


<style scoped>
>>> .table {
  margin: 10px 0;
}
</style>