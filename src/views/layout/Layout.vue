<template>
    <div>
        <Layout class="layout">
            <Sidebar class="sidebar"></Sidebar>
            <div class="container">
                <Header></Header>
                <Tags></Tags>
                <Content class="content">
                  <router-view></router-view>
                </Content>
            </div>
        </Layout>
    </div>
</template>

<script>
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header.vue";
import Tags from "./tags/Tags";
export default {
  components: {
    Sidebar,
    Header,
    Tags
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang='less'>
@import "./layout.less";
</style>