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
        </Header>
    </div>
</template>

<script>
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
    }
  }
};
</script>

<style scoped lang='less'>
.header {
  background-color: #fff;
  margin-bottom: 1px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
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
}
</style>