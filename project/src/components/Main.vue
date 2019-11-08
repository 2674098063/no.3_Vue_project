<template>
  <div @mousewheel="setScroll">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Tabbar />
  </div>
</template>
<script>
import Tabbar from "../pages/Tabbar";

export default {
  components: {
    Tabbar
  },
  mounted() {
    window.addEventListener("scroll", this.setScroll);
  },
  methods: {
    setScroll() {
      if (window.location.hash.indexOf("home") >= 0) {
        this.$store.dispatch("setHomeTop", window.scrollY);
      } else if (window.location.hash.indexOf("ins") >= 0) {
        this.$store.dispatch("setInsTop", window.scrollY);
      }
    }
  }
};
</script>