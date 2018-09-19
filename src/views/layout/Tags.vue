<template>
    <div class="tags" ref="tags">
        <div class="left">
            <Button type="default" @click="handleBack">
                <Icon type="ios-arrow-back" size="16"/>
            </Button>
        </div>
        <div class="right">
            <Button type="default" @click="handleForward">
                <Icon type="ios-arrow-forward" size="16"/>
            </Button>
            <Dropdown placement="bottom-end">
                <Button href="javascript:void(0)" type="default">
                    <Icon type="md-close"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem @click="handleCloseAll">关闭所有</DropdownItem>
                    <DropdownItem @click="handleCloseOther">关闭其他</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <div class="tags-list" ref="tagsList" :style="{left: tagBodyLeft + 'px'}">
            <Tag type="dot" color="primary" :color="isCrrentTag({name: 'Home',path: '/Home'})?'primary':'default'" key="Home">
                <router-link to="/Home">
                    Home
                </router-link>
            </Tag>
            <Tag v-for="item in tagList" type="dot" closable @on-close="tagClose" :name="item.name" :color="isCrrentTag(item)?'primary':'default'" :key="item.path">
                <router-link :to="item.path">
                    {{item.name}}
                </router-link>
            </Tag>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    tagList: {
      type: Array
    }
  },
  data() {
      return {
          tagBodyLeft:0
      }
  },
  computed: {},
  methods: {
    tagClose(event,name) {
      this.$emit("tagClose", name);
    },
    isCrrentTag(item) {
      let isCurrent = this.$route.name;
      if (item.name === isCurrent) {
        return true;
      }
      return false;
    },
    handleBack() {
       let length = this.$refs.tags.offsetWidth-100;
       let tagsLength = this.$refs.tagsList.offsetWidth;
       if(tagsLength<length){
           return
       }else {
           this.tagBodyLeft = length - tagsLength
       }
    },
    handleForward() {},
    handleCloseAll() {},
    handleCloseOther() {},
    getTagName(name) {
        this.$nextTick(()=>{
            
        })
    }
  },
  watch: {
      $route(to) {
        this.getTagName(to.name)
      }
  }
};
</script>

<style scoped lang='less'>
.tags {
  height: 36px;
  position: relative;
  .ivu-btn {
    height: 36px;
    border-radius: 0;
    padding: 0 5px;
  }
  .tags-list{
      display: inline-block;
      position: absolute;
      padding: 0 60px 0 40px;
      z-index: 9;
      white-space: nowrap;
  }
  .left {
    position: absolute;
    left: 0;
    z-index: 10;
  }
  .right {
    position: absolute;
    right: 0;
    z-index: 10;
  }
  .ivu-tag-text {
    a {
      color: #333;
    }
  }
}
</style>