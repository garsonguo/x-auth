<template>
    <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler" ak="0H3hj15e73s2GwKS7iXa3Ws0jYY4Ad7P">
    </baidu-map>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
export default {
  components: {
    BaiduMap
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