<style scoped lang='less'>
@import "./tags.less";
</style>

<template>
    <div class="tags" ref="tags">
        <div class="left">
            <Button type="default" @click="handleScroll(240)">
                <Icon type="ios-arrow-back" size="16"/>
            </Button>
        </div>
        <div class="right">
            <Button type="default" @click="handleScroll(-240)">
                <Icon type="ios-arrow-forward" size="16"/>
            </Button>
            <Dropdown placement="bottom-end" @on-click="handleClose">
                <Button type="default">
                    <Icon type="md-close"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem name="closeAll">关闭所有</DropdownItem>
                    <DropdownItem name="closeOther">关闭其他</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <div class="tags-list" ref="tagsList" :style="{left: tagBodyLeft + 'px'}">
            <Tag type="dot" color="primary" :color="isCrrentTag({name: 'Home',path: '/Home'})?'primary':'default'" key="Home">
                <router-link to="/Home">
                    首页
                </router-link>
            </Tag>
            <Tag 
            v-for="(item, index) in tagListCookie" 
            type="dot" 
            closable 
            ref="tag"
            @on-close="tagClose" 
            :name="item.name" 
            :color="isCrrentTag(item)?'primary':'default'" 
            :key="`tag-${index}`">
                <router-link :to="item.path">
                    {{item.meta.title}}
                </router-link>
            </Tag>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import {
  getNewTagList,
  closeTags,
  keepTags,
  getTagCookie,
  deleteTagCookie
} from "@/libs/util.js";
export default {
  data() {
    return {
      tagBodyLeft: 0,
      tagListCookie: this.tagList
    };
  },
  mounted() {
    this.tagListCookie = getTagCookie();
  },
  computed: {
    ...mapState(["tagList"])
  },
  watch: {
    $route(to) {
      this.getTagName(to.name);
      let list = getNewTagList(this.tagListCookie, to);
      this.updateTagList(list);
      this.tagListCookie = getTagCookie();
    }
  },
  methods: {
    ...mapMutations(["updateTagList"]),
    tagClose(event, name) {
      let filterArray = closeTags(this.tagList, name);
      this.updateTagList(filterArray);
      this.tagListCookie = getTagCookie();
      const length = filterArray.length - 1;
      if (length === -1) {
        this.$router.push({ name: "Home" });
      } else {
        this.$router.push(filterArray[length]);
      }
    },
    isCrrentTag(item) {
      let isCurrent = this.$route.name;
      if (item.name === isCurrent) {
        return true;
      }
      return false;
    },
    handleScroll(offset) {
      let outerLength = this.$refs.tags.offsetWidth;
      let tagsLength = this.$refs.tagsList.offsetWidth;
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset);
      } else {
        if (outerLength < tagsLength) {
          if (this.tagBodyLeft < -(tagsLength - outerLength)) {
            this.tagBodyLeft = this.tagBodyLeft;
          } else {
            this.tagBodyLeft = Math.max(
              this.tagBodyLeft + offset,
              outerLength - tagsLength
            );
          }
        } else {
          this.tagBodyLeft = 0;
        }
      }
    },
    handleClose(name) {
      if (name === "closeAll") {
        this.updateTagList([]);
        this.tagListCookie = getTagCookie();
        this.$router.push({
          name: "Home"
        });
      } else {
        let currentRoute = this.$route.name;
        let keepTag = keepTags(this.tagList, currentRoute);
        this.updateTagList(keepTag);
        this.tagListCookie = getTagCookie();
        this.$router.push(keepTag[0]);
      }
    },
    moveToView(tag) {
      let outerLength = this.$refs.tags.offsetWidth;
      let tagsLength = this.$refs.tagsList.offsetWidth;
      let tagLength = tag.offsetWidth;
      let tagLeft = tag.offsetLeft;
      if (outerLength > tagsLength) {
        this.tagBodyLeft = 0;
      } else if (tagLeft < -this.tagBodyLeft) {
        this.tagBodyLeft = -tagLeft;
      } else if (
        tagLeft > -this.tagBodyLeft &&
        tagLeft + tagLength < -this.tagBodyLeft + outerLength
      ) {
        this.tagBodyLeft = Math.min(0, outerLength - tagLength - tagLeft - 80);
      } else {
        this.tagBodyLeft = -(tagLeft + tagLength - (outerLength - 80));
      }
    },
    getTagName(name) {
      this.$nextTick(() => {
        let tags = this.$refs.tag || [];
        tags.forEach((item, index) => {
          if (item.name === name) {
            let tag = tags[index].$el;
            this.moveToView(tag);
          }
        });
      });
    }
  }
};
</script>
