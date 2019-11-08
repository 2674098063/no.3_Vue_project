<template>
  <van-tabbar v-model="active" active-color="#58bc58">
    <van-tabbar-item name="home" to="/main/home" icon="home-o" @click="toHomeTop">首页</van-tabbar-item>
    <van-tabbar-item name="ins" to="/main/ins" icon="search" @click="toInsTop">发现</van-tabbar-item>
    <van-tabbar-item name="friends" to="/main/submit" icon="balance-list-o">订单</van-tabbar-item>
    <van-tabbar-item name="setting" to="/main/setting" icon="setting-o">设置</van-tabbar-item>
  </van-tabbar>
</template>
<script>
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";

Vue.use(Tabbar).use(TabbarItem);
export default {
  data() {
    return {
      active: "home"
    };
  },
  watch: {
    $route: "setactive"
  },
  methods: {
    toHomeTop() {
      setTimeout(() => {
        window.scrollTo(0, this.$store.getters.getHomeTop);
      }, 0);
    },
    toInsTop() {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    },
    setactive() {
      if (this.$route.name == "index") {
        this.active = "setting";
      } else {
        this.active = this.$route.name;
      }
    }
  },
  computed: {}
};
</script>