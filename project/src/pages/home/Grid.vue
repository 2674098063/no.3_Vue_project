<template>
  <van-grid :column-num="5">
    <van-grid-item v-for="(g,index) in gridsComputed" :key="index" :icon="g.url" :text="g.name" />
  </van-grid>
</template>
<script>
import Vue from "vue";
import { Grid, GridItem } from "vant";
import axios from "axios";

Vue.use(Grid).use(GridItem);
export default {
  data() {
    return {
      grids: []
    };
  },
  created() {
    this.loadMore();
  },
  methods: {
    loadMore() {
      axios.get("http://localhost:3000/entries").then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          let url = data[i].url.slice(0, 3) + "/" + data[i].url.slice(3);
          url = url.slice(0, 1) + "/" + url.slice(1);
          data[i].url = `https://cube.elemecdn.com/${url}.jpeg?
          x-oss-process=image/format,webp/resize,w_90,h_90,m_fixed`;
        }
        this.grids = data;
      });
    }
  },
  computed: {
    gridsComputed() {
      return this.grids.slice(0, 10);
    }
  }
};
</script>