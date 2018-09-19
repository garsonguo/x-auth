<template>
    <div>
        <Layout class="layout">
            <Sidebar class="sidebar" :menuList="menuList" :isCollapsed="isCollapsed"></Sidebar>
            <div class="container">
                <Header @collapsedSider="collapsedSider"></Header>
                <Tags :tagList="tagList" @tagClose="tagClose"></Tags>
                <Content class="content">
                  <router-view></router-view>
                </Content>
            </div>
        </Layout>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getNewTagList, closeTags } from '../../libs/util.js'
import routerConfig from '../../router/routerConfig.js'
import Sidebar from './Sidebar'
import Header from './Header'
import Tags from './Tags'
export default {
  components:{
    Sidebar,
    Header,
    Tags
  },
  data() {
    return {
      isCollapsed: false,
      routeList: null,
      menuList:[]
    };
  },
  mounted(){
    this.menuList = routerConfig
  },
  computed: {
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
    ...mapState([
      'tagList'
    ])
  },
  watch: {
    $route(newRoute) {
      let list = getNewTagList(this.tagList, newRoute)
      this.updateTagList(list)
    }
  },
  methods: {
    ...mapMutations([
      'updateTagList'
    ]),
    collapsedSider(isCollapsed) {
      this.isCollapsed = isCollapsed
    },
    tagClose(name) {
      let filterArray = closeTags(this.tagList, name)
      this.updateTagList(filterArray)
      const length =filterArray.length-1
      if(length===-1){
        this.$router.push({name:'Home'})
      }else{
        this.$router.push(filterArray[length])
      }
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
        padding:15px;
        background-color: #fff;
        min-height: 260px;
    }
  }
}
</style>