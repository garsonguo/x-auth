<template>
    <div>
        <Layout class="layout">
            <Sider class="sider" ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
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
            <Layout class="container">
                <Header :style="{padding: 0}" class="header layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                    <Breadcrumb class="bread-crumb">
                        <BreadcrumbItem v-for="item in routeList" :to="item.path" :key="item.path">
                          {{item.name}}
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Header>
                <Content class="content" :style="{padding: '15px', background: '#fff', minHeight: '260px'}">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false,
      routeList: null,
      menuList:[{
          id: '1',
          name: 'Home',
          icon: 'ios-navigate',
          path: '/Home'
      },{
          id: '2',
          name: 'About',
          icon: 'ios-navigate',
          children: [{
            id: '2-1',
            name: 'About1',
            icon: 'ios-navigate',
            path: '/About/About1'
          },{
            id: '2-1',
            name: 'About2',
            icon: 'ios-navigate',
            path: '/About/About2'
          }]
      }]
    };
  },
  mounted() {
      let matched = this.$route.matched.filter(item => !item.redirect)
      this.routeList = matched
  },
  watch: {
    $route: function(route){
      let matched = route.matched.filter(item => !item.redirect)
      this.routeList = matched
    }
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
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    }
  }
};
</script>

<style scoped lang='less'>
.layout {
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
  }
  .container {
    .header {
      background: #fff;
      margin-bottom: 1px solid #ffffff;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
      .bread-crumb{
          display: inline-block;
      }
    }
    .content{
        height: calc( 100vh - 64px );
        overflow: auto;
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