<template>
  <div>
    <div v-if="foods.length">
      <van-checkbox-group
        slot="title"
        v-for="(item,index) in foods"
        :key="index"
        class="box clearfix"
        v-model="result"
        :data-id="index"
        ref="checkboxGroup"
      >
        <van-col span="6" class="checkeds_box clearfix">
          <van-checkbox class="checked_btn" :name="index"></van-checkbox>
        </van-col>
        <van-col span="18" class="foods_box clearfix">
          <div class="foods_img">
            <img src="https://cube.elemecdn.com/d/90/d002c62a316875699e202edb43888jpeg.jpeg" />
          </div>
          <div class="foods_text clearfix">
            <h3>{{item.name}}</h3>
            <p>
              <span class="colorRed mr5">￥{{item.specfoods[0].price}}</span>x
              <span>{{item.number}}</span>
            </p>
          </div>
          <span class="delete" :data-id="index" @click="deletfoods(index)">删除</span>
        </van-col>
      </van-checkbox-group>
      <div class="h100"></div>
    </div>
    <div v-if="!foods.length">
      <br />
      <br />
      <van-icon name="replay" @click="refresh" />
      <br />
      <p class="fs12">订单有延迟，请点击上方按钮刷新页面获取最新订单</p>
    </div>
    <van-submit-bar :price="foodstotal" class="b50" @submit="buyfoods" button-text="提交订单"></van-submit-bar>
    <div class="mb100"></div>
  </div>
</template>
<script>
import Vue from "vue";
import { Checkbox, CheckboxGroup } from "vant";
import qs from "qs"; //用于拦截OPTIONS的请求
Vue.use(Checkbox).use(CheckboxGroup);
export default {
  data() {
    return {
      result: [0, 1, 2],
      checked: true,
      user: null,
      foods: [...this.$store.getters.getFoods],
      istrue: true
    };
  },
  created() {
    this.load();
  },
  watch: {
    $route: "load"
  },
  methods: {
    load() {
      this.foods = this.$store.getters.getFoods;
      if (this.foods.length) {
        this.result = this.foods.map((item, index) => {
          return index;
        });
      }
    },
    refresh() {
      this.foods = this.$store.getters.getFoods;
      this.load();
    },
    deletfoods(i) {
      let arr = [];
      this.foods.map((item, index) => {
        if (i == index) {
          window.console.log(item);
        } else {
          arr.push(item);
        }
      });
      window.console.log(arr);
      this.$store.dispatch("setFoods", arr);
      this.load();
    },
    buyfoods() {
      let name = "key";
      var strCookie = document.cookie;
      //cookie的保存格式是 分号加空格 "; "
      var arrCookie = strCookie.split("; ");
      let key;
      for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name && name) {
          key = arr[1];
          this.$axios
            .post(
              "http://localhost:3000/tokenKey",
              qs.stringify({
                tokenKey: key
              })
            )
            .then(({ data }) => {
              this.user = data;
              let arr = [];
              this.$store.dispatch("setFoods", arr);
              this.load();
            });
        } else {
          window.location.href = "http://localhost:8081/#/login";
        }
      }
    }
  },
  computed: {
    foodsLen() {
      return this.foods.length;
    },
    foodstotal() {
      let totle = 0;
      if (this.foods.length) {
        for (var i = 0; i < this.result.length; i++) {
          let index = this.result[i];
          totle +=
            this.foods[index].number * this.foods[index].specfoods[0].price;
        }
      }
      return totle * 100;
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  border-bottom: 3px solid #eee;
}
.checkeds_box {
  position: relative;

  height: 108px;
  width: 50px;
  .checked_btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}
.foods_text {
  h3 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.foods_box {
  position: relative;
  text-align: left;
  .delete {
    color: #eee;
    display: block;
    padding: 5px 10px;
    border-radius: 2px;
    background: red;
    position: absolute;
    right: -20px;
    top: 45px;
  }
}

.checked_btn {
  margin-left: 10px;
}
.foods_img {
  float: left;
  height: 108px;
  img {
    box-sizing: border-box;
    padding: 20px;
    height: 100%;
  }
}
.clearfix:before,
.clearfix:after {
  /*清楚浮动*/
  content: "";
  display: table;
}

.clearfix:after {
  clear: both;
}

.clearfix {
  *zoom: 1;
  /*IE/7/6*/
}
.h100 {
  height: 100px;
}
.mr5 {
  margin-right: 5px;
}
.b50 {
  bottom: 50px;
}
.colorRed {
  color: red;
}
.fs12 {
  font-size: 12px;
}
</style>