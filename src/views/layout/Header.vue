<template>
    <div>
        <Header :style="{padding: 0}" class="header layout-header-bar">
            <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
            <Breadcrumb class="bread-crumb">
                <BreadcrumbItem v-for="item in routeList" :to="item.path" :key="item.path">
                    {{item.name}}
                </BreadcrumbItem>
            </Breadcrumb>
        </Header>
    </div>
</template>

<script>
export default {
  props: {
    routeList: {
      type: Array
    }
  },
  data() {
    return {
      isCollapsed: false
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    }
  },
  methods: {
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
  .ivu-icon:hover {
    cursor: pointer;
  }
}
</style>