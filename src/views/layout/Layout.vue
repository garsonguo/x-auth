<template>
    <div>
        <Layout class="layout">
            <Sidebar class="sidebar" :menuList="menuList" :isCollapsed="isCollapsed" @handleOnSelect="handleOnSelect"></Sidebar>
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
  mounted(){},
  computed: {
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
    ...mapState([
      'tagList'
    ])
  },
  methods: {
    ...mapMutations([
      'updateTagList'
    ]),
    collapsedSider(isCollapsed) {
      this.isCollapsed = isCollapsed
    },
    handleOnSelect(item) {
      let _this = this
      let nameArray = []
      _this.tagList.forEach(function(value,key){
        nameArray.push(value.name)
      })
      let nameA2= [...new Set(nameArray)]
      if(nameA2.indexOf(item)===-1){
        _this.tagList.push({
          name: item,
          path: _this.$route.path
        })
      }
      this.updateTagList(_this.tagList)
    },
    tagClose(item) {
      let filterArray = this.tagList.filter((value)=>{
        return value.name != item.name
      })
      this.tagList = filterArray
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