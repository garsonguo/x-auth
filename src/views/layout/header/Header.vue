<style scoped lang='less'>
@import "./header.less";
</style>

<template>
    <div>
        <Header :style="{padding: 0}" class="header layout-header-bar">
            <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
            <Breadcrumb class="bread-crumb">
                <BreadcrumbItem :to="{path:'/'}">
                    首页
                </BreadcrumbItem>
                <template v-for="item in routeList" v-if="item.name!=='Home' && item.name!=='Layout'">
                    <BreadcrumbItem :key="item.path">
                        {{item.meta.title}}
                    </BreadcrumbItem>
                </template>
            </Breadcrumb>
            <Dropdown class="logout" placement="bottom-end" @on-click="handleLogout">
                <a href="javascript:void(0)">
                  <img class="logo" src="../../../assets/logo.png">
                  <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem name="closeAll">退出登录</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </Header>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import { deleteToken } from "@/libs/auth.js";
export default {
  data() {
    return {
      isCollapsed: false,
      routeList: null
    };
  },
  mounted() {
    this.getRouteList();
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    }
  },
  watch: {
    $route: function(route) {
      this.routeList = this.$route.matched;
    }
  },
  methods: {
    ...mapMutations(["collapsedMenu"]),
    getRouteList() {
      this.routeList = this.$route.matched;
    },
    collapsedSider() {
      this.isCollapsed = !this.isCollapsed;
      this.collapsedMenu(this.isCollapsed);
      // this.$emit("collapsedSider", this.isCollapsed);
    },
    handleLogout() {
      deleteToken();
      this.$router.push({
        name: "Login"
      });
    }
  }
};
</script>