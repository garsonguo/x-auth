<template>
    <div>
        <Layout class="layout">
            <Sidebar class="sidebar" :menuList="menuList" :isCollapsed="isCollapsed"></Sidebar>
            <div class="container">
                <Header @collapsedSider="collapsedSider"></Header>
                <Tags 
                :tagList="tagListCookie" 
                @tagClose="tagClose"
                @handleCloseAll="handleCloseAll"
                @handleCloseOther="handleCloseOther"
                ></Tags>
                <Content class="content">
                  <router-view></router-view>
                </Content>
            </div>
        </Layout>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getNewTagList, closeTags, keepTags, getTagCookie } from '../../libs/util.js'
import routerConfig from '../../router/routerConfig.js'
import Sidebar from './sidebar/Sidebar'
import Header from './header/Header.vue'
import Tags from './tags/Tags'
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
      menuList:[],
      tagListCookie: []
    };
  },
  mounted(){
    this.menuList = routerConfig
    this.tagListCookie = getTagCookie()
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
      let list = getNewTagList(this.tagListCookie, newRoute)
      this.updateTagList(list)
      this.tagListCookie = getTagCookie()
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
    },
    handleCloseAll() {
      this.updateTagList([])
      this.$router.push({
        name: 'Home'
      })
    },
    handleCloseOther(currentTag) {
      let keepTag = keepTags(this.tagList,currentTag)
      this.updateTagList(keepTag)
      this.$router.push(keepTag[0])
    }
  }
};
</script>

<style scoped lang='less'>
@import './layout.less';
</style>