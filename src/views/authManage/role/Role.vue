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
            v-model="modalShow"
            :title="modalTitle"
            :mask-closable="maskClosable">
            <Form
            ref="roleModel"
            :model="roleModel"
            :label-width="80"
            :rules="roleRules"
            style="width:400px;">
                <FormItem label="角色名称" prop="name">
                    <Input type="text" v-model="roleModel.name"></Input>
                </FormItem>
                <FormItem label="角色编码" prop="code">
                    <Input type="text" v-model="roleModel.code"></Input>
                </FormItem>
                <FormItem label="角色描述" prop="description">
                    <Input type="textarea" v-model="roleModel.description"></Input>
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
import { add, queryList, deleteRole, edit } from "@/api/authManage/role.js";
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
      roleModel: {},
      roleRules: {
        name: [
          {
            required: true,
            message: "角色名称不能为空",
            trigger: "blur"
          }
        ],
        code: [
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
      roleData: []
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
      queryList(params).then(res => {
        this.roleData = res.list;
        this.pageTotal = res.count;
      });
    },
    empty() {
      this.searchModel = {};
    },
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
      deleteRole(params.row.id).then(res => {
        if (res.status === 200) {
          this.roleData.splice(params.index, 1);
          this.$Message.success("删除成功!");
        } else {
          this.$Message.success("删除失败!");
        }
      });
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
    handleCancel() {
      this.modalShow = false;
    },
    handleSubmit() {
      this.$refs["roleModel"].validate(valid => {
        if (valid) {
          let model = this.roleModel;
          this.modalShow = false;
          if (this.modalTitle === "新增功能") {
            add(model).then(res => {
              if (res.status === 200) {
                this.modalShow = false;
                this.roleData.push(model);
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
    }
  }
};
</script>

<style scoped>
@import "./role.less";
</style>