<style lang='less'>
@import "./sidebar.less";
</style>

<template>
    <div>
        <Sider class="sider" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
            <div class="title">
                x-auth
            </div>
            <Menu ref="sidebar" 
            accordion 
            :active-name="activeName" 
            :open-names="openName" 
            theme="dark" 
            width="auto" 
            :class="menuitemClasses">
                <template v-for="item in menuList">
                    <MenuItem :name="item.name" v-if="!item.children">
                      <router-link :to="item.path">
                          <Icon :type="item.icon"></Icon>
                          <span>{{item.title}}</span>
                      </router-link>
                    </MenuItem>
                    <Submenu v-else :name="item.name">
                      <template slot="title">
                          <Icon :type="item.icon" />
                          <span>{{item.title}}</span>
                      </template>
                      <MenuItem :name="child.name" v-for="child in item.children">
                          <router-link :to="child.path">
                          <Icon :type="child.icon"></Icon>
                          <span>{{child.title}}</span>
                          </router-link>
                      </MenuItem>
                    </Submenu>
                </template>
            </Menu>
        </Sider>
    </div>
</template>

<script>
import { mapState } from "vuex";
import routerConfig from "../../../router/routerConfig.js";

export default {
  data() {
    return {
      openName: [],
      activeName: "",
      menuList: []
    };
  },
  created() {
    this.getOpenName();
  },
  mounted() {
    this.menuList = routerConfig;
    this.activeName = this.$route.name;
    let _this = this;
    // 关键延迟20ms
    setTimeout(
      _this.$nextTick(() => {
        _this.$refs.sidebar.updateActiveName();
      }),
      20
    );
  },
  watch: {
    $route() {
      this.activeName = this.$route.name;
      this.getOpenName();
    }
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
    ...mapState(["isCollapsed"])
  },
  methods: {
    getOpenName() {
      let _this = this;
      this.openName = [];
      this.openName.push(this.$route.fullPath.split("/")[1]);
      setTimeout(
        _this.$nextTick(() => {
          _this.$refs.sidebar.updateOpened();
        }),
        20
      );
    }
  }
};
</script>

