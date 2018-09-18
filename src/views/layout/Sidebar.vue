<template>
    <div>
        <Sider class="sider" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
            <div class="title">
                x-auth
            </div>
            <Menu @on-select="handleOnSelect" :active-name="$route.name" :open-names="openName" theme="dark" width="auto" :class="menuitemClasses">
                <template v-for="item in menuList">
                    <MenuItem :name="item.name" v-if="!item.children">
                      <router-link :to="item.path">
                          <Icon :type="item.icon"></Icon>
                          <span>{{item.name}}</span>
                      </router-link>
                    </MenuItem>
                    <Submenu v-else :name="item.name">
                      <template slot="title">
                          <Icon type="ios-paper" />
                          <span>{{item.name}}</span>
                      </template>
                      <MenuItem :name="child.name" v-for="child in item.children">
                          <router-link :to="child.path">
                          <Icon :type="child.icon"></Icon>
                          <span>{{child.name}}</span>
                          </router-link>
                      </MenuItem>
                    </Submenu>
                </template>
            </Menu>
        </Sider>
    </div>
</template>

<script>
export default {
  props: {
    menuList: {
      type: Array
    },
    isCollapsed: {
      type: Boolean
    }
  },
  data() {
    return {
      openName: []
    };
  },
  created() {
    this.getOpenName();
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    getOpenName() {
      this.openName.push(this.$route.fullPath.split("/")[1]);
    },
    handleOnSelect(item) {
      this.$emit('handleOnSelect',item)
    }
  }
};
</script>

<style lang='less'>
.sider {
  height: 100vh;
  .title {
    height: 64px;
    line-height: 64px;
    color: #fff;
    font-size: 24px;
    border-bottom: 1px solid #dddddd;
    padding-left: 24px;
  }
  .menu-item {
    span {
      display: inline-block;
      overflow: hidden;
      width: 69px;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: bottom;
      transition: width 0.2s ease 0.2s;
    }
    i {
      transform: translateX(0px);
      transition: font-size 0.2s ease, transform 0.2s ease;
      vertical-align: middle;
      font-size: 16px;
    }
    .ivu-menu-item {
      a {
        display: inline-block;
        width: 100%;
        height: 100%;
        color: #fff;
        .ivu-icon {
          display: inline;
          margin-right: 8px;
        }
      }
    }
  }
  .collapsed-menu {
    span {
      width: 0px;
      transition: width 0.2s ease;
    }
    i {
      transform: translateX(5px);
      transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
      vertical-align: middle;
      font-size: 22px;
    }
    .ivu-menu-submenu-title-icon {
      display: none;
    }
    .ivu-menu-submenu {
      position: relative;
    }
    .ivu-menu-item-active{
      .ivu-menu-submenu-title{
        background-color: #363e4f !important;
        .ivu-icon{
          margin-left: -4px;
        }
      }
    }
    .ivu-menu-submenu:hover,
    .ivu-menu-opened{
      .ivu-menu{
        display: block !important;
        position: absolute;
        top: 0;
        left: 100%;
        z-index: 10;
        background-color: #363e4f;
        .ivu-menu-item:hover{
          background-color: #2d8cf0!important;
        }
        span{
          width: 69px;
        }
      }
    }
  }
}
</style>