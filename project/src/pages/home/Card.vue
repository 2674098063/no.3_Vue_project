<template>
  <van-list
    :offset="50"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    class="card"
  >
    <van-card
      v-for="(item,index) in restaurantsComputed"
      :key="index"
      :price="item.order_lead_time/2 +'/人'"
      :desc="item.description"
      :title="item.name"
      :thumb="item.image_path"
    >
      <div slot="tags">
        <van-tag
          class="mr5"
          plain
          :color="colorComputed(item.order_lead_time)"
          type="primary"
        >{{item.distance +'米'}}</van-tag>

        <van-tag
          plain
          :color="colorComputed(item.order_lead_time)"
          type="primary"
        >{{'预计'+item.order_lead_time+'到达'}}</van-tag>
      </div>
      <div slot="footer">
        <van-button
          size="mini"
          :url="'http://localhost:8081/#/Show?id='+item.batch_id"
          @click="enterBtn"
          :id="'e'+item.batch_id"
        >进入</van-button>
      </div>
    </van-card>
  </van-list>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      finished: false,
      sorting: "",
      restaurants: [],
      old: [],
      testid: ""
    };
  },

  methods: {
    onLoad() {
      this.$axios.get("http://localhost:3000/restaurants").then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          let str = "";
          if (data[i].image_path.indexOf("png") >= 0) {
            str = "png";
          } else if (data[i].image_path.indexOf("jpeg") >= 0) {
            str = "jpeg";
          }
          let url =
            data[i].image_path.slice(0, 3) + "/" + data[i].image_path.slice(3);
          url = url.slice(0, 1) + "/" + url.slice(1);
          data[
            i
          ].image_path = `https://cube.elemecdn.com/${url}.${str}?x-oss-process=image/format,webp/resize,w_130,h_130,m_fixed`;
        }
        this.restaurants = this.restaurants.concat(data);
        this.old = this.restaurants.map(item => {
          return item;
        });
        // window.console.log(this.restaurants);
        //加载状态结束
        this.loading = false;
        if (this.restaurants.length >= 30) {
          this.finished = true;
        }
      });
    },

    colorComputed(time) {
      if (time <= 15) {
        return "#58bc58";
      } else if (time < 30) {
        return "#FF5500";
      } else {
        return "red";
      }
    },
    enterBtn(e) {
      let id = e.target.id.replace(/e/g, "");
      this.testid = id;
      // window.console.log(id);
    }
  },
  computed: {
    price() {
      return this.$store.getters.getPrice;
    },
    search() {
      return this.$store.getters.getAuthor;
    },
    restaurantsComputed() {
      if (this.search.value) {
        return this.restaurants.filter(item => {
          if (item.name.indexOf(this.search.value) >= 0) {
            return item;
          }
        });
      }
      if (this.price.min >= 1 && this.price.max <= 1000) {
        return this.restaurants.filter(item => {
          if (
            item.order_lead_time / 2 > this.price.min &&
            item.order_lead_time / 2 < this.price.max
          ) {
            return item;
          }
        });
      } else if (this.search.sorting || this.search.sorting === 0) {
        // window.console.log(this.$store.state);
        let item = this.restaurants;
        let a;
        if (this.search.sorting == 1) {
          for (var i = 0; i < item.length; i++) {
            for (var j = 1; j < item.length; j++) {
              if (item[j - 1].order_lead_time > item[j].order_lead_time) {
                a = item[j - 1];
                item[j - 1] = item[j];
                item[j] = a;
              }
            }
          }
        } else if (this.search.sorting == 2) {
          for (var n = 0; n < item.length; n++) {
            for (var m = 1; m < item.length; m++) {
              if (item[m - 1].order_lead_time < item[m].order_lead_time) {
                a = item[m - 1];
                item[m - 1] = item[m];
                item[m] = a;
              }
            }
          }
        } else {
          item = this.old;
        }

        // window.console.log(item);
        return item;
      }
      if (this.search.switch) {
        let arr = [];
        this.restaurants.map(i => {
          if (i.order_lead_time < 30) {
            arr.push(i);
          }
        });
        // window.console.log(arr);
        return arr;
      }
      return this.restaurants;
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  font-size: 12px;
}
.mr5 {
  margin-right: 5px;
}
.card {
  margin-bottom: 50px;
}
</style>