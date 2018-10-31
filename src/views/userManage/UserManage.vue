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
            <div class="btn">
                <Button type="primary" @click="add">新增</Button>
                <Button style="margin-left: 8px" :disabled="disabled">删除</Button>
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
            ref="userManageModel"
            :model="userManageModel"
            :label-width="80"
            :rules="userManageRules"
            style="width:400px;">
                <FormItem label="账号名称" prop="accountName">
                    <Input type="text" v-model="userManageModel.account"></Input>
                </FormItem>
                <FormItem label="用户名称" prop="userName">
                    <Input type="text" v-model="userManageModel.name"></Input>
                </FormItem>
                <FormItem label="用户邮箱" prop="userEmail">
                    <Input type="text" v-model="userManageModel.email"></Input>
                </FormItem>
                <FormItem label="电话号码" prop="module">
                    <Input type="text" v-model="userManageModel.phone"></Input>
                </FormItem>
                <FormItem label="密码" prop="module">
                    <Input type="text" v-model="userManageModel.password"></Input>
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
import { registered } from "../../api/user.js";
export default {
  data() {
    return {
      searchModel: {},
      modalShow: false,
      modalTitle: "",
      showTatal: true,
      maskClosable: false,
      disabled: true,
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
      userManageData: [
        {
          accountName: "admin",
          userName: "admin",
          userEmail: "123@163.com",
          phone: "18627185963"
        }
      ]
    };
  },
  methods: {
    add() {
      this.modalTitle = "新增功能";
      this.modalShow = true;
      this.userManageModel = {};
    },
    edit(rowInfo) {
      this.modalTitle = "编辑功能";
      this.modalShow = true;
      //
      this.userManageModel = rowInfo;
    },
    remove(params) {
      // 删除table行信息
    },
    handleCancel() {
      this.modalShow = false;
    },
    handleSubmit() {
      this.$refs["userManageModel"].validate(valid => {
        if (valid) {
          let model = this.userManageModel;
          registered(model).then(res => {
            if (res.status === 200) {
              this.modalShow = false;
              this.$Message.success("提交成功!");
            } else {
              this.$Message.error("提交失败!");
            }
          });
        }
      });
    },
    handlePage(page) {
      let currentPage = page;
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

