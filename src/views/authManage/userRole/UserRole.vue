<template>
    <div>
        <Form 
        class="search"
        :model="searchModel" 
        :label-width="80"
        inline>
            <FormItem label="账号名称">
                <Input type="text" v-model="searchModel.accountName" placeholder="账号名称查询"></Input>
            </FormItem>
            <FormItem label="用户邮箱">
                <Input type="text" v-model="searchModel.userEmail" placeholder="用户邮箱查询"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary">查询</Button>
                <Button style="margin-left: 8px">清空</Button>
            </FormItem>
        </Form>
        <div class="table">
            <Table border 
            ref="selection" 
            :columns="userRoleColumns" 
            :data="userRoleData"
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
            :model="roleSearchModel" 
            :label-width="80"
            inline>
                <FormItem label="角色名称">
                    <Input type="text" v-model="roleSearchModel.name" placeholder="账号名称查询"></Input>
                </FormItem>
                <FormItem label="角色编码">
                    <Input type="text" v-model="roleSearchModel.code" placeholder="用户邮箱查询"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary">查询</Button>
                    <Button style="margin-left: 8px">清空</Button>
                </FormItem>
            </Form>
            <Table 
            border
            :columns="roleListColumns" 
            :data="roleListData"
            ></Table>
            <div class="pages">
              <Page class="pull-right" 
              :total = "pageTotalRole" 
              :current = "currentPageRole" 
              show-sizer
              :page-size = "pageSizeRole"
              :show-total = "showTatal"
              @on-change = "handlePageRole"
              :page-size-opts = "pageSizeOpt"
              @on-page-size-change = "handlePageSizeRole"
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
  queryUserRole,
  deleteRoleUser
} from "../../../api/authManage/role.js";
import { queryUserList } from "../../../api/userManage/user.js";
export default {
  data() {
    return {
      searchModel: {},
      roleSearchModel: {},
      userId: "",
      disabled: true,
      showTatal: true,
      modalShow: false,
      maskClosable: false,
      modalTitle: "",
      pageTotal: 0,
      currentPage: 1,
      pageSize: 5,
      pageSizeOpt: [2, 5, 10],
      pageTotalRole: 0,
      currentPageRole: 1,
      pageSizeRole: 5,
      userRoleColumns: [
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
                "角色列表"
              )
            ]);
          }
        }
      ],
      userRoleData: [],
      userListModel: {},
      roleListColumns: [
        {
          title: "角色名称",
          key: "name"
        },
        {
          title: "角色编码",
          key: "code"
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
      roleListData: []
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
    queryUserList(params).then(res => {
      this.userRoleData = res.list;
      this.pageTotal = res.count;
    });
    let paramsRole = {
      pageSize: this.pageSizeRole,
      currentPage: this.currentPageRole,
      sortBy: "",
      descending: "",
      filter: this.roleSearchModel
    };
    queryList(paramsRole).then(res => {
      this.roleListData = res.list;
      this.pageTotalRole = res.count;
    });
  },
  methods: {
    async initRoleList() {
      let params = {
        pageSize: this.pageSizeRole,
        currentPage: this.currentPageRole,
        sortBy: "",
        descending: "",
        filter: this.roleSearchModel
      };
      let uparams = {
        userId: this.userId
      };
      let roleUser = await queryUserRole(uparams);
      let type = Object.prototype.toString.call(roleUser.data.result);
      let roleList = await queryList(params);

      let list = roleList.list.map(role => {
        let ids = [];
        if (type === "[object Object]") {
          ids.push(roleUser.data.result);
        } else if (type === "[object Undefined]") {
          ids = ids;
        } else {
          ids = roleUser.data.result;
        }
        if (ids.length === 0) {
          role.status = "消除";
        }
        ids.forEach(item => {
          if (item.roleId === role.id) {
            role.status = "添加";
          } else {
            role.status = "消除";
          }
        });
        return role;
      });
      this.roleListData = list;
    },
    edit(rowInfo) {
      this.modalTitle = "用户列表";
      this.modalShow = true;
      this.roleModel = rowInfo;
      this.userId = rowInfo.id;
      this.initRoleList();
    },
    remove(params) {
      let statue = this.roleListData[params.index].addStatus;
      if (statue === "添加") {
        params.row.addStatus = "移除";
        this.$set(this.roleListData, params.index, params.row);
      } else {
        params.row.addStatus = "添加";
        this.$set(this.roleListData, params.index, params.row);
      }
    },
    handleSelectChange(param) {},
    handleSelect() {},
    handleSelectAll() {},
    handleCancel() {},
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
      queryUserList(params).then(res => {
        this.userRoleData = res.list;
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
        this.userRoleData = res.list;
        this.pageTotal = res.count;
      });
    },
    handlePageSizeRole(page) {
      this.pageSizeRole = page;
      this.initRoleList();
    },
    handlePageRole(page) {
      this.currentPageRole = page;
      this.initRoleList();
    },
    roleAddUser(params) {
      let ids = {
        roleId: params.row.id,
        userId: this.userId
      };
      add(ids).then(res => {
        if (res.status == 200) {
          let statue = this.roleListData[params.index].status;
          if (statue === "消除") {
            params.row.status = "添加";
            this.$set(this.roleListData, params.index, params.row);
          } else {
            params.row.status = "消除";
            this.$set(this.roleListData, params.index, params.row);
          }
          this.$Message.success("添加成功!");
        } else {
          this.$Message.error("添加失败!");
        }
      });
    },
    roleRemoveUser(params) {
      let ids = {
        roleId: params.row.id,
        userId: this.userId
      };
      deleteRoleUser(ids).then(res => {
        if (res.status == 200) {
          let statue = this.roleListData[params.index].status;
          if (statue === "消除") {
            params.row.status = "添加";
            this.$set(this.roleListData, params.index, params.row);
          } else {
            params.row.status = "消除";
            this.$set(this.roleListData, params.index, params.row);
          }
          this.$Message.success("移除成功!");
        } else {
          this.$Message.error("移除失败!");
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
@import "./userRole.less";
</style>


<style scoped>
>>> .table {
  margin: 10px 0;
}
</style>