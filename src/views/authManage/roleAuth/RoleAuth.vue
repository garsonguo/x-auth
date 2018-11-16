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
            v-model="modalShow"
            :title="modalTitle"
            :mask-closable="maskClosable">
            <Tree 
            ref="tree"
            :data="menuTreeList"
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
import {
  queryList,
  deleteRole,
  edit,
  addAccess,
  queryAccessList
} from "../../../api/authManage/role.js";
import { queryList as queryMenuList } from "../../../api/systemSet/menu.js";
export default {
  data() {
    return {
      searchModel: {},
      roleId: "",
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
                      this.edit(params);
                    }
                  }
                },
                "编辑角色权限"
              )
            ]);
          }
        }
      ],
      roleData: [],
      menuTreeList: []
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
    treeInit(checkedIds) {
      queryMenuList(checkedIds).then(res => {
        let list = res;
        this.menuTreeList = [];
        let maplist = list.map(item => {
          item.expand = true;
          checkedIds.forEach(nodeId => {
            if (item.id === nodeId.menuId) {
              item.checked = true;
            }
          });
          return item;
        });
        let tree = list.filter(father => {
          let branchArr = list.filter(child => {
            return father.id == child.parentId;
          });
          if (branchArr.length > 0) {
            father.children = branchArr;
          }
          return father.parentId == 0;
        });
        tree.forEach(item => {
          this.menuTreeList.push(item);
        });
      });
    },
    edit(rowInfo) {
      this.modalTitle = "编辑功能";
      this.modalShow = true;
      this.roleId = rowInfo.row.id;
      let params = {
        roleId: this.roleId
      };
      queryAccessList(params).then(res => {
        if (res.status == 200) {
          let nodeIds = res.data.result;
          this.treeInit(nodeIds);
        }
      });
    },
    handleSelectChange(param) {},
    handleSelect() {},
    handleSelectAll() {},
    handleCancel() {},
    handleSubmit() {
      // 获取树选中的节点
      var checkedNode = this.$refs.tree.getCheckedNodes();
      let checkedIDs = [];
      checkedNode.forEach(item => {
        if (!item.children) {
          checkedIDs.push(item.id);
        }
      });
      let params = {
        roleId: this.roleId,
        nodeIds: checkedIDs
      };
      addAccess(params).then(res => {
        if (res.status == 200) {
          this.$Message.success("添加成功!");
        } else {
          this.$Message.error("添加失败");
        }
      });
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
    }
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