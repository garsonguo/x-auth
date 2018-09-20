<style lang='less'>
@import './sidebar.less';
</style>

<template>
    <div>
        <Sider class="sider" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
            <div class="title">
                x-auth
            </div>
            <Menu :active-name="$route.name" :open-names="openName" theme="dark" width="auto" :class="menuitemClasses">
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
    }
  }
};
</script>

