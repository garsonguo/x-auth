<style scoped lang="less">
@import "./fuction.less";
</style>

<template>
    <div>
        <Form 
        class="search"
        :model="searchModel" 
        :label-width="80"
        inline>
            <FormItem label="模块名称">
                <Input type="text" v-model="searchModel.moduleName" placeholder="模块模糊查询"></Input>
            </FormItem>
            <FormItem label="功能名称">
                <Input type="text" v-model="searchModel.functionName" placeholder="功能模糊查询"></Input>
            </FormItem>
            <FormItem label="功能编码">
                <Input type="text" v-model="searchModel.functionCode" placeholder="编码模糊查询"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary">查询</Button>
                <Button style="margin-left: 8px">清空</Button>
            </FormItem>
        </Form>
        <div class="table">
            <div class="btn">
                <Button type="primary" @click="add">新增</Button>
                <Button style="margin-left: 8px">删除</Button>
            </div>
            <Table border ref="selection" :columns="funColumns" :data="funData"></Table>
        </div>
        <Modal
            v-model="modalShow"
            :title="modalTitle"
            ok-text="提交"
            cancel-text="关闭"
            @on-ok="submit"
            mask-closable="false"
            @on-cancel="cancel">
            <Form
            ref="funModel"
            :model="funModel"
            :label-width="80"
            :rules="funRules"
            style="width:400px;">
                <FormItem label="功能名称" prop="functionName">
                    <Input type="text" v-model="funModel.functionName"></Input>
                </FormItem>
                <FormItem label="功能编码" prop="functionCode">
                    <Input type="text" v-model="funModel.functionCode"></Input>
                </FormItem>
                <FormItem label="功能描述">
                    <Input v-model="funModel.functionDes" type="textarea" placeholder="Enter something..." />
                </FormItem>
                <FormItem label="模块" prop="module">
                    <Cascader :data="moduleList" v-model="funModel.module"></Cascader>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
export default {
  data() {
    return {
      searchModel: {},
      modalShow: false,
      modalTitle: "",
      funModel: {},
      funRules: {
        functionName: [
          {
            required: true,
            message: "功能名称不能为空",
            trigger: "blur"
          }
        ],
         functionCode: [
          {
            required: true,
            message: "功能编码不能为空",
            trigger: "blur"
          }
        ],
         module: [
          {
            required: true,
            message: "模块不能为空",
            trigger: "blur"
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
          key: "moduleName"
        },
        {
          title: "功能名称",
          key: "functionName"
        },
        {
          title: "功能编码",
          key: "moduleCode"
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
                      this.edit(params.index);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      funData: [
        {
          moduleName: "功能管理1",
          functionName: "编辑功能",
          moduleCode: "function_edit"
        }
      ],
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
  methods: {
    add() {
      this.modalTitle = "新增功能";
      this.modalShow = true;
    },
    edit() {},
    remove() {},
    submit() {},
    cancel() {
      this.modalShow = false;
    },
    showTree() {
      this.treeShow = true;
    },
    selectChange() {}
  }
};
</script>

