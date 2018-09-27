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
            v-model="modalShow"
            :title="modalTitle"
            :mask-closable="maskClosable">
            <Tree 
            ref="tree"
            :data="dataTree" 
            show-checkbox
            multiple
            ></Tree>
            <div slot="footer">
              <Button @click="handleCancel">关闭</Button>
              <Button type="info" @click="handleSubmit">提交</Button>
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
          key: "roleName"
        },
        {
          title: "角色编码",
          key: "roleCode"
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
                "编辑角色权限"
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
      dataTree: [
        {
          title: "系统",
          expand: true,
          children: [
            {
              id: "1",
              title: "系统设置",
              expand: true,
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
              expand: true,
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
              expand: true,
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
              expand: true,
              children: [
                {
                  id: "4-1",
                  title: "用户管理"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    edit(rowInfo) {
      this.modalTitle = "编辑功能";
      this.modalShow = true;
      this.roleModel = rowInfo;
    },
    handleSelectChange(param) {},
    handleSelect() {},
    handleSelectAll() {},
    handleCancel() {},
    handleSubmit() {
        // 获取树选中的节点
      var attay = this.$refs.tree.getCheckedNodes()
    },
    getSelectedNodes() {},
    handlePage() {}
  }
};
</script>

<style scoped>
@import "./roleAuth.less";
</style>

<style scoped>
>>> .table {
  margin: 10px 0;
}
</style>