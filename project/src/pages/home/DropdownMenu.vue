<template>
  <van-dropdown-menu class="dropdownMenu">
    <van-dropdown-item v-model="value" :options="option" />
    <div class="price">
      <input type="text" v-model.number="min" @input="min_number($event)" /> -
      <input v-model.number="max" type="text" @input="max_number($event)" />￥
    </div>
    <van-dropdown-item title="筛选" ref="item">
      <van-switch-cell v-model="switch1" title="30分钟内到达" />
      <van-button block type="info" @click="onConfirm">确认</van-button>
    </van-dropdown-item>
  </van-dropdown-menu>
</template>
<script>
export default {
  data() {
    return {
      value: 0,
      switch1: false,
      min: "",
      max: "",
      option: [
        { text: "综合排序", value: 0 },
        { text: "实惠多多", value: 1 },
        { text: "品质优先", value: 2 }
      ]
    };
  },
  watch: {
    value: function() {
      this.onSorting();
    }
  },
  methods: {
    onConfirm() {
      this.$refs.item.toggle();
      this.$store.dispatch("setAuthor", {
        switch: this.switch1
      });
    },
    onSorting() {
      this.$store.dispatch("setAuthor", {
        sorting: this.value
      });
    },
    min_number(e) {
      this.min = e.target.value.replace(/[^\d]/g, "");
      if (this.min) {
        this.$store.dispatch("setPrice", {
          min: this.min,
          max: this.$store.state.price.max
        });
      }
    },
    max_number(e) {
      this.max = e.target.value.replace(/[^\d]/g, "");
      if (this.max) {
        this.$store.dispatch("setPrice", {
          max: this.max,
          min: this.$store.state.price.min
        });
      }
    }
  },
  computed: {}
};
</script>
<style lang="scss" scoped>
.dropdownMenu {
  display: flex;
  .price {
    flex: 1;
    justify-self: center;
    align-self: center;
    input {
      width: 24px;
      height: 18px;
      border: 1px solid #ccc;
    }
  }
}
</style>