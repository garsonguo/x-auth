<template>
    <div>
        <Header :style="{padding: 0}" class="header layout-header-bar">
            <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
            <Breadcrumb class="bread-crumb">
                <BreadcrumbItem :to="{path:'/'}">
                    Home
                </BreadcrumbItem>
                <template v-for="item in routeList" v-if="item.name!=='Home' && item.name!=='Layout'">
                    <BreadcrumbItem :key="item.path">
                        {{item.name}}
                    </BreadcrumbItem>
                </template>
            </Breadcrumb>
            <Dropdown class="logout" placement="bottom-end" @on-click="handleLogout">
                <a href="javascript:void(0)">
                  <img class="logo" src="../../assets/logo.png">
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
import { deleteToken } from '../../libs/auth.js'
export default {
  data() {
    return {
      isCollapsed: false,
      routeList: null
    };
  },
  mounted() {
    this.getRouteList()
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    }
  },
  watch: {
    $route: function(route){
      this.routeList = this.$route.matched
    }
  },
  methods: {
    getRouteList() {
      this.routeList = this.$route.matched
    },
    collapsedSider() {
      this.isCollapsed = !this.isCollapsed;
      this.$emit("collapsedSider", this.isCollapsed);
    },
    handleLogout() {
      deleteToken()
      this.$router.push({
        name: 'Login'
      })
    }
  }
};
</script>

<style scoped lang='less'>
.header {
  background-color: #fff;
  .ivu-icon:hover {
    cursor: pointer;
  }
  .bread-crumb {
    display: inline-block;
  }
  .menu-icon {
    transition: all 0.3s;
  }
  .rotate-icon {
    transform: rotate(-90deg);
  }
  .logout{
    float: right;
    margin-right: 20px;
  }
  .logo{
    width: 32px;
    height: 32px;
    border-radius: 50%;
    vertical-align: middle;
    background-color: red;
    margin-right: 5px;
  }
}
</style>