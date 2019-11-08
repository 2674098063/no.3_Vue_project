<template>
  <van-sticky>
    <van-search
      v-model="value"
      label="广州"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @search="onSearch"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
  </van-sticky>
</template>

<style scoped>
</style>
<script>
import Vue from "vue";
import { Search } from "vant";

Vue.use(Search);
export default {
  data() {
    return {
      value: ""
    };
  },
  components: {},
  methods: {
    onSearch() {
      this.$store.dispatch("setAuthor", {
        value: this.value
      });
      this.value = "";
    }
  }
};
</script>