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
            <div class="btn">
                <Button type="primary" @click="add">新增</Button>
                <Button style="margin-left: 8px" :disabled="disabled">删除</Button>
            </div>
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
            <Form
            ref="roleModel"
            :model="roleModel"
            :label-width="80"
            :rules="roleRules"
            style="width:400px;">
                <FormItem label="角色名称" prop="roleName">
                    <Input type="text" v-model="roleModel.roleName"></Input>
                </FormItem>
                <FormItem label="角色编码" prop="roleCode">
                    <Input type="text" v-model="roleModel.roleCode"></Input>
                </FormItem>
                <FormItem label="角色描述" prop="roleDes">
                    <Input type="textarea" v-model="roleModel.roleDes"></Input>
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
                      this.remove(params.index);
                    }
                  }
                },
                [h("a", {}, "删除")]
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
      ]
    };
  },
  methods: {
    add() {
      this.modalTitle = "新增功能";
      this.modalShow = true;
      this.roleModel = {};
    },
    edit(rowInfo) {
      this.modalTitle = "编辑功能";
      this.modalShow = true;
      this.roleModel = rowInfo;
    },
    remove(params) {
      // 删除table行信息
    },
    handleSelectChange(param) {
      if (param.length === 0) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
    handleSelect() {},
    handleSelectAll() {},
    handleCancel() {},
    handleSubmit() {
      this.$refs["roleModel"].validate(valid => {
        if (valid) {
          let model = this.funModel;
          this.modalShow = false;
          this.$Message.success("提交成功!");
        } else {
          this.$Message.error("提交失败!");
        }
      });
    },
    handlePage() {}
  }
};
</script>

<style scoped>
@import "./role.less";
</style>