<template>
  <div @load="load" @mousewheel="foodScroll">
    <van-icon name="arrow-left" class="return" @click="returnPage" />
    <div class="show_header">
      <div class="nav">
        <img
          src="https://cube.elemecdn.com/d/b9/24b9467286187cf184edebe16b787png.png?x-oss-process=image/format,webp/resize,w_750"
          alt
        />
      </div>
      <div class="show_details">
        <div class="show_img">
          <img
            src="https://cube.elemecdn.com/7/5f/38e116a9928830f4b4627ee3b1991jpeg.jpeg?x-oss-process=image/format,webp/resize,w_150"
            alt
          />
        </div>
        <div class="show_name" v-if="batch_shop.rst">
          <h2 v-text="batch_shop.rst.name"></h2>
          <p class="show_address show_text" v-text="batch_shop.rst.address"></p>
          <p class="show_description show_text" v-text="batch_shop.rst.description"></p>
        </div>
      </div>
    </div>
    <div class="show_main">
      <van-tabs v-model="activeName" color="#58bc58" :sticky="!toptop">
        <van-tab title="点餐" name="a" @click="diancan" v-if="batch_shop.menu">
          <!-- <div class="clearfix foods_box">
            <van-sticky :offset-top="50" :z-index="0" class="goods_nav_box">
              <van-sidebar
                v-model="activeKey"
                :sticky="true"
                id="goods_nav_f"
                class="fl goods_nav"
                @change="change"
              >
                <van-sidebar-item
                  class="goods_nav_list"
                  v-for="(item,index) in batch_shop.menu"
                  :key="index"
                  :title="item.name"
                />
              </van-sidebar>
            </van-sticky>
            <div class="foodsMain">
              <div
                class="fr int clearfix"
                v-for="(item,index) in batch_shop.menu"
                :key="index"
                :name="index"
              >
                <h2 :id="'show_class_'+index" class="show_class_box" v-text="item.name"></h2>

                <div class="clearfix fr zi100" v-for="(food,i) in item.foods" :key="i">
                  <span class="goods_img fl">
                   
                    <img :src="menuImgurl(food.image_path)" alt @click="buyFood(index,i)" />
                  </span>
                  <div class="fl goods_main">
                    <h4 v-text="food.name" @click="buyFood(index,i)"></h4>
                    <p class="intText" v-text="food.materials" @click="buyFood(index,i)"></p>
                    <p class="intText" v-text="food.tips"></p>
                    <p>
                      <span class="price" v-text="'￥'+food.specfoods[0].price"></span>
                      <span class="buy">
                        <van-icon name="add" @click="addCart(food)" />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="empty50"></div>-->
        </van-tab>
        <van-tab title="推荐" name="b" @click="diancan">内容 2</van-tab>
        <van-tab title="店家详情" name="c" @click="diancan">
          <Rst v-if="batch_shop.rst" />
        </van-tab>
      </van-tabs>
    </div>
    <div class="foodDetails van-action-sheet" v-if="food.name">
      <van-action-sheet
        v-model="show"
        :round="false"
        :overlay="false"
        class="foodDetails_main van-action-sheet"
        style="max-height:100%"
        title="菜"
        cancel-text
      >
        <div class="foodDetails_img">
          <img :src="menuImgurl(food.image_path)" alt />
        </div>
        <div class="foodDetails_int">
          <h2>{{food.name}}</h2>
          <p class="intText foodDetails_intText">{{food.tips}}</p>
          <p class="buy_food clearfix">
            <span class="price">￥{{food.specfoods[0].price}}</span>
            <span class="buy">
              <van-icon name="add" @click="addCart(food)" />
            </span>
          </p>
          <p class="intText foodDetails_intText">{{food.materials}}</p>
        </div>
      </van-action-sheet>
    </div>
    <div class="buyCart" v-show="activeName=='a'">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="订单" :info="foodsLength" />
        <van-goods-action-button color="#be99ff" type="warning" text="去结算" @click="toCart" />
      </van-goods-action>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
import Rst from "./Rst";
export default {
  data() {
    return {
      activeName: "a",
      activeKey: 0,
      indexList: [],
      batch_shop: {},
      show: false,
      food: [],
      foods: [],
      toptop: true
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      let hash = window.location.hash.split("?")[1];
      let hash_id = hash.split("=")[1];
      Axios.get("http://localhost:3000/batch_shop?" + hash_id).then(
        ({ data }) => {
          this.$store.dispatch("setBatchShop", { ...data });
          this.batch_shop = this.$store.getters.getBatchShop[0];
          for (let i = 0; i < this.batch_shop.menu.length; i++) {
            let index = i + 1;
            this.indexList.push(index);
          }
        }
      );
    },
    returnPage() {
      window.location.href = "http://localhost:8081/#/main/home";
    },
    diancan() {
      this.toptop = true;
    },
    change(index) {
      // index += 1;
      this.toptop = false;
      let height = document.querySelector("#show_class_" + index).offsetTop;
      window.scrollTo(0, height - 50);
    },
    showLoading() {
      this.batch_shop = this.$store.getters.getBatchShop[0];
    },
    foodScroll() {
      this.toptop = false;
      let food = document.getElementsByClassName("show_class_box");
      for (let i = 0; i < food.length; i++) {
        let fTop = food[i].offsetTop - 50;
        if (window.scrollY >= fTop) {
          this.activeKey = i;
        }
      }
    },
    buyFood(index, i) {
      this.show = true;
      this.food = this.batch_shop.menu[index].foods[i];
    },
    addCart(food) {
      if (this.foods.length) {
        for (let i = 0; i < this.foods.length; i++) {
          if (this.foods[i].item_id == food.item_id) {
            this.foods[i].number++;
            break;
          }
          if (i == this.foods.length - 1) {
            food.number = 1;
            this.foods.push(food);
          }
        }
      } else {
        food.number = 1;
        this.foods.push(food);
      }

      this.show = false;
    },
    toCart() {
      let now = new Date().getTime();
      this.$store.dispatch("setFoods", this.foods);
      window.location.href = "http://localhost:8081/#/main/submit?" + now;
    }
  },
  watch: {
    activeName(val) {
      window.scrollTo(0, 0);
      this.toptop = true;
      if (val == "a") {
        setTimeout(() => {
          document.querySelectorAll(".goods_nav_list")[2].click();
          document.querySelectorAll(".goods_nav_list")[0].click();
          // setTimeout(() => {
          //   document.querySelectorAll(".goods_nav_list")[0].click();
          // });
        });

        window.console.log(this.toptop, val);
      }
    }
  },
  computed: {
    menuImgurl() {
      return function(url) {
        let str = "";
        if (url.indexOf("png") >= 0) {
          str = "png";
        } else if (url.indexOf("jpeg") >= 0) {
          str = "jpeg";
        }
        let imgurl = url.slice(0, 3) + "/" + url.slice(3);
        imgurl = imgurl.slice(0, 1) + "/" + imgurl.slice(1);
        imgurl = "https://cube.elemecdn.com/" + imgurl + "." + str;
        return imgurl;
      };
    },
    foodsLength() {
      return this.foods.length;
    }
  },
  components: {
    // Goods
    Rst
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.test {
  height: 2000px;
}
.return {
  position: absolute;
  top: 2%;
  left: 2%;
  font-size: 28px;
  width: 28px;
  height: 28px;
  z-index: 100;
}
.show_text {
  font-size: 10px;
  color: #aaa;
  padding: 5px;
}
.show_description {
  color: #888;
}
.show_header {
  width: 100%;
  .nav {
    width: 100%;
    margin-bottom: 50px;
    img {
      width: 100%;
    }
  }
  .foodDetails_main {
    height: 100%;
    max-height: 100%;
  }
  .van-action-sheet {
    max-height: 100% !important;
  }
  .show_details {
    position: relative;
    .show_img {
      width: 100px;
      position: absolute;
      top: -125%;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        width: 100%;
      }
    }
  }
}
* {
  margin: 0;
  padding: 0;
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
.fl {
  float: left;
}
.fr {
  float: right;
}
h4 {
  margin: 5px 0;
}
.goods_nav_list {
  height: 40px;
}
.goods_nav {
  margin-right: 15px;
}
#goods_nav_f {
  z-index: -100 !important;
}
.intText {
  color: #ccc;
  font-size: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.int {
  width: 65%;
  margin-right: 10px;
  margin-bottom: 15px;
}
.goods_img {
  position: relative;
  display: inline-block;
  width: 85px;
  height: 85px;
  margin: 10px 0;
  img {
    width: 100%;
  }
}
.goods_main {
  padding-left: 4px;
  width: 145px;
  height: 100px;
  position: relative;
  text-align: left;
  h4 {
    width: 95%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .foods_box {
    padding-bottom: 50px;
  }
  .price {
    position: absolute;
    bottom: 5px;
    color: red;
  }
  .buy {
    position: absolute;
    bottom: 5px;
    right: 10px;
    font-size: 20px;
    color: #0085fd;
  }
}
.price {
  position: absolute;
  bottom: 5px;
  color: red;
}
.buy {
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-size: 20px;
  color: #0085fd;
}
.foodDetails_img {
  width: 100%;
  margin-bottom: 20px;
  img {
    width: 100%;
  }
}
.foodDetails_int {
  padding-left: 20px;
  margin-bottom: 400px;
  h2 {
    margin-bottom: 20px;
  }
  p {
    padding: 3px 0;
  }
}
.foodDetails {
  text-align: left;
}
.buy_food {
  position: relative;
  height: 30px;
  .price {
    bottom: 5px;
    color: red;
  }
  .buy {
    bottom: 5px;
    right: 10px;
    font-size: 20px;
    color: #0085fd;
  }
}
.empty50 {
  height: 50px;
}
</style>