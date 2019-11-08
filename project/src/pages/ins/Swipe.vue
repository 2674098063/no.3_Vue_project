<template>
  <div>
    <van-swipe class="mt20" :autoplay="5000" indicator-color="white">
      <van-swipe-item v-for="(i,index) in images" :key="index">
        <img :src="i" :title="index" @click="preview()" alt />
      </van-swipe-item>
    </van-swipe>
    <van-image-preview v-model="show" :images="images" @change="onChange">
      <template v-slot:index>第{{ index+1 }}张</template>
    </van-image-preview>
  </div>
</template>
<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";

Vue.use(Swipe).use(SwipeItem);
export default {
  data() {
    return {
      show: false,
      index: 0,
      images: [
        "http://03imgmini.eastday.com/mobile/20190903/2019090309_840d349c514c40dba9b6eeb0b466d2f1_6658_mwpm_03201609.jpg",
        "http://03imgmini.eastday.com/mobile/20190923/2019092322_b154de2a013d495ebd986b4176cbe5e5_1418_mwpm_03201609.jpg",
        "http://00imgmini.eastday.com/mobile/20190905/2019090508_97d7c044170a4793b3b87793a988a8cd_8939_mwpm_03201609.jpg"
      ]
    };
  },
  methods: {
    preview() {
      this.show = !this.show;
    },
    onChange(index) {
      this.index = index;
    }
  }
};
</script>
<style lang="scss" scoped>
.mt20 {
  margin-top: 20px;
}
</style>