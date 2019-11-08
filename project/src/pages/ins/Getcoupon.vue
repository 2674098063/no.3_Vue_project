<template>
  <div>
    <van-coupon-list
      :coupons="couponsComputed"
      enabled-title="所有优惠卷"
      :disabled-coupons="disabledComputed"
      @change="onChange"
      @exchange="onExchange"
    />
  </div>
</template>
<script>
// const disabledCoupons = [];
export default {
  data() {
    return {
      chosenCoupon: -1,
      coupons: [],
      //   disabledCoupons: this.disabledComputed,
      showList: true
    };
  },
  created() {
    this.getcoupon();
  },
  methods: {
    onChange(index) {
      this.chosenCoupon = index;
    },
    onExchange() {
      this.coupons.push();
    },
    getcoupon() {
      this.$axios.get("http://localhost:3000/coupon").then(({ data }) => {
        data.map(item => {
          let arr = item.condition.split("\\n");
          item.condition = arr[0] + "\n" + arr[1];
        });
        this.coupons = this.coupons.concat(data);
      });
    }
  },
  computed: {
    couponsComputed() {
      let now = new Date().getTime() / 1000;
      let arr = [];
      this.coupons.map(item => {
        if (now < item.endAt) {
          arr.push(item);
        }
      });
      return arr;
    },
    disabledComputed() {
      let now = new Date().getTime();
      now = now / 1000;
      let arr = [];
      this.coupons.map(item => {
        if (now > item.endAt) {
          arr.push(item);
        }
      });

      return arr;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>