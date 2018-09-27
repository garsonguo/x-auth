<template>
    <div>
        <Form 
        class="search"
        :model="searchModel" 
        :label-width="80"
        inline>
            <FormItem label="角色名称">
                <Input type="text" v-model="searchModel.roleName" placeholder="名称模糊查询"></Input>
            </FormItem>
            <FormItem label="角色编码">
                <Input type="text" v-model="searchModel.roleCode" placeholder="编码模糊查询"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary">查询</Button>
                <Button style="margin-left: 8px">清空</Button>
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
                <FormItem label="账号名称">
                    <Input type="text" v-model="userListModel.roleName" placeholder="账号名称查询"></Input>
                </FormItem>
                <FormItem label="用户邮箱">
                    <Input type="text" v-model="userListModel.roleCode" placeholder="用户邮箱查询"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary">查询</Button>
                    <Button style="margin-left: 8px">清空</Button>
                </FormItem>
            </Form>
            <Table 
            border
            :columns="userListColumns" 
            :data="userListData"
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
      roleModel: {},
      roleRules: {
        roleName: [
          {
            required: true,
            message: "角色名称不能为空",
            trigger: "blur"
          }
        ],
        roleCode: [
          {
            required: true,
            message: "角色编码不能为空",
            trigger: "blur"
          }
        ]
      },
      roleColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "角色名称",
          key: "roleName",
          sortable: true
        },
        {
          title: "角色编码",
          key: "roleCode",
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
      roleData: [
        {
          roleName: "功能管理1",
          roleCode: "编辑功能",
          module: ["System", "SystemSet", "MenuManage"]
        }
      ],
      userListModel: {},
      userListColumns: [
        {
          title: "账号名称",
          key: "accountName"
        },
        {
          title: "用户名称",
          key: "userName"
        },
        {
          title: "用户邮箱",
          key: "userEmail"
        },
        {
          title: "phone",
          key: "phoneNum"
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
      userListData: [
        {
          accountName: "admin",
          userName: "张三",
          userEmail: "123@qq.com",
          phoneNum: "18627185963",
          addStatus: "添加"
        },
        {
          accountName: "测试",
          userName: "李四",
          userEmail: "123@qq.com",
          phoneNum: "18627185963",
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
      let statue = this.userListData[params.index].addStatus;
      if (statue === "添加") {
        params.row.addStatus = "消除";
        this.$set(this.userListData, params.index, params.row);
      } else {
        params.row.addStatus = "添加";
        this.$set(this.userListData, params.index, params.row);
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
@import "./roleUser.less";
</style>


<style scoped>
>>> .table {
  margin: 10px 0;
}
</style>