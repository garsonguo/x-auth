<template>
    <baidu-map class="map" 
    :center="center" 
    :zoom="zoom" 
    @ready="handler" 
    ak="0H3hj15e73s2GwKS7iXa3Ws0jYY4Ad7P">
        <bm-scale anchor="BMAP_ANCHOR_TOP_LEFT"></bm-scale>
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
    </baidu-map>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import { BmScale, BmNavigation, BmOverviewMap } from "vue-baidu-map";
export default {
  components: {
    BaiduMap,
    BmScale,
    BmNavigation,
    BmOverviewMap
  },
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3
    };
  },
  methods: {
    handler({ BMap, map }) {
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
    }
  }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 94%;
}
</style>