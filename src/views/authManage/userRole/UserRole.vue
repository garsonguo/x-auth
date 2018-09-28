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
              :total="20" 
              :current="1" 
              show-sizer
              :show-total="showTatal"
              @on-change="handlePage"
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
                <FormItem label="角色名称">
                    <Input type="text" v-model="userListModel.roleName" placeholder="账号名称查询"></Input>
                </FormItem>
                <FormItem label="角色编码">
                    <Input type="text" v-model="userListModel.roleCode" placeholder="用户邮箱查询"></Input>
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
            <div slot="footer">
              <Button @click="handleCancel">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
  data() {
    return {
      searchModel: {},
      disabled: true,
      showTatal: true,
      modalShow: false,
      maskClosable: false,
      modalTitle: "",
      userRoleColumns: [
        {
          title: "账号名称",
          key: "accountName",
          sortable: true
        },
        {
          title: "用户名称",
          key: "userName",
          sortable: true
        },
        {
          title: "用户邮箱",
          key: "userEmail",
          sortable: true
        },
        {
          title: "phone",
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
      userRoleData: [
        {
          accountName: "功能管理1",
          userName: "编辑功能",
          userEmail: "121@123.com",
          phone: "18627185963"
        }
      ],
      userListModel: {},
      roleListColumns: [
        {
          title: "角色名称",
          key: "roleName"
        },
        {
          title: "角色编码",
          key: "roleCode"
        },
        {
          title: "添加状态",
          key: "addStatus"
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
                      this.remove(params);
                    }
                  }
                },
                "移除"
              )
            ]);
          }
        }
      ],
      roleListData: [
        {
          roleName: "admin",
          roleCode: "role_admin",
          addStatus: "添加"
        },
        {
          roleName: "测试",
          roleCode: "role_test",
          addStatus: "移除"
        }
      ]
    };
  },
  methods: {
    edit(rowInfo) {
      this.modalTitle = "用户列表";
      this.modalShow = true;
      this.roleModel = rowInfo;
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
    handlePage() {}
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