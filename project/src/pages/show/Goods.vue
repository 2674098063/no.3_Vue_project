<template>
  <div class="clearfix">
    <div class="clearfix foods_box">
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
    <div class="empty50"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeKey: 0,
      indexList: [],
      batch_shop: {},
      food: [],
      foods: []
    };
  },

  created() {
    // this.showLoading();
    this.batch_shop = this.batch_shopF;
    window.console.log(this.batch_shop);
  },
  methods: {
    change(index) {
      // index += 1;
      this.toptop = false;
      let height = document.querySelector("#show_class_" + index).offsetTop;
      window.scrollTo(0, height - 50);
    },
    showLoading() {
      this.batch_shop = this.$store.getters.getBatchShop[0];
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
    }
  }
};
</script>
<style lang="scss" scoped>
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
.goods_nav {
  margin-right: 15px;
}
.intText {
  color: #ccc;
  font-size: 12px;
}
.int {
  width: 65%;
  margin-right: 10px;
  margin-bottom: 15px;
}
.goods_img {
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
</style>