<template>
    <div>
        <Sider class="sider" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
            <div class="title">
                x-auth
            </div>
            <Menu :active-name="$route.name" theme="dark" width="auto" :class="menuitemClasses">
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
                        {{item.name}}
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
    menuList:{
        type:Array
    },
    isCollapsed:{
        type:Boolean
    }
  },
  data() {
    return {
    }
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""]
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""]
    }
  }
};
</script>

<style scoped lang='less'>
  .sider {
    height: 100vh;
    .title{
        height: 64px;
        line-height: 64px;
        color: #fff;
        font-size: 24px;
        border-bottom: 1px solid #dddddd;
        padding-left: 24px;
    }
    .ivu-menu-item{
      a{
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>