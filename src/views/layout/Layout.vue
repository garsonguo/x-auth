<template>
    <div>
        <Layout class="layout">
            <Sidebar class="sidebar" :menuList="menuList" :isCollapsed="isCollapsed"></Sidebar>
            <div class="container">
                <Header @collapsedSider="collapsedSider"></Header>
                <Content class="content" :style="{padding: '15px', background: '#fff', minHeight: '260px'}">
                    <router-view></router-view>
                </Content>
            </div>
        </Layout>
    </div>
</template>

<script>
import Sidebar from './Sidebar'
import Header from './Header'
export default {
  components:{
    Sidebar,
    Header
  },
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
      // let matched = this.$route.matched.filter(item => !item.redirect)
      // this.routeList = matched
  },
  // watch: {
  //   $route: function(route){
  //     let matched = route.matched.filter(item => !item.redirect)
  //     this.routeList = matched
  //   }
  // },
  computed: {
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    collapsedSider(isCollapsed) {
      this.isCollapsed = isCollapsed
    }
  }
};
</script>

<style scoped lang='less'>
.layout {
  flex-direction: row;
  .container {
    flex: auto;
    .content{
        height: calc( 100vh - 64px );
        overflow: auto;
    }
  }
}
</style>