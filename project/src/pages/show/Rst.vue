<template>
  <div class="rst_box">
    <div class="rst_header">
      <h4>配送信息</h4>
      <p>由商家配送提供配送，约{{rst.order_lead_time}}分钟送达，距离{{distance}}km</p>
      <p>配送费￥{{rst.float_delivery_fee}}</p>
    </div>
    <div class="rst_photo">
      <h4>商家实景</h4>
      <div class="photo">
        <p v-for="(item,index) in rst.albums" :key="index" @click="albumsImg">
          <img :src="imgurl(item.cover_image_hash)" alt />
          <span>{{item.name}}</span>
        </p>
      </div>
    </div>
    <div class="rst_main">
      <h4>商家信息</h4>
      <div class="description">{{rst.description}}</div>
      <div>
        <span>品类</span>
        <span>
          <i v-for="(item,index) in rst.flavors" :key="index">{{item.name}}&nbsp;&nbsp;</i>
        </span>
      </div>
      <div>
        <span>商家电话</span>
        <span></span>
      </div>
      <div>
        <span>地址</span>
        <span>{{rst.address}}</span>
      </div>
      <div>
        <span>营业时间</span>
        <span>{{rst.opening_hours[0]}}</span>
      </div>
    </div>
    <van-image-preview v-model="show" :images="images" :start-position="index" @change="onChange"></van-image-preview>
  </div>
</template>
<script>
export default {
  data() {
    return { show: false, rst: {}, index: 0, images: [], imgtag: [] };
  },
  created() {
    this.rstload();
  },
  methods: {
    rstload() {
      this.rst = this.$store.getters.getBatchShop[0].rst;
      this.rst.albums.map(item => {
        let url = item.cover_image_hash;
        let str = "";
        if (url.indexOf("png") >= 0) {
          str = "png";
        } else if (url.indexOf("jpeg") >= 0) {
          str = "jpeg";
        }
        let imgurl = url.slice(0, 3) + "/" + url.slice(3);
        imgurl = imgurl.slice(0, 1) + "/" + imgurl.slice(1);
        imgurl = "https://cube.elemecdn.com/" + imgurl + "." + str;
        this.imgtag.push(item.name);
        this.images.push(imgurl);
      });
    },
    albumsImg() {
      this.show = true;
    },
    onChange(index) {
      this.index = index;
    }
  },
  computed: {
    distance() {
      let distance = this.rst.distance / 1000;
      distance = distance.toFixed(1);
      return distance;
    },
    imgurl() {
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
.rst_box {
  background: #eee;
  text-align: left;
  h4 {
    text-align: left;
  }
  > div {
    background: #fff;
    padding: 15px;
    box-sizing: border-box;
    p {
      font-size: 13px;
    }
  }
  .rst_header {
    margin-bottom: 20px;
    padding-right: 45px;
    box-sizing: border-box;
  }
  .rst_photo {
    margin-bottom: 15px;
    .photo {
      padding: 5px;
      display: flex;
      overflow: auto;
      > p {
        position: relative;
        height: 80px;
        width: 80px;
        margin-right: 10px;
        span {
          display: block;
          position: absolute;
          width: 100%;
          left: 0;
          bottom: 0;
          padding: 5px 0;
          text-align: center;
          color: #ddd;
          background: rgba(58, 55, 55, 0.41);
        }
      }
      img {
        width: 80px;
        height: 80px;
      }
    }
  }
  .rst_main {
    margin-bottom: 20px;
    .description {
      font-size: 14px;
    }
    > div {
      margin-bottom: 5px;
      color: #aaa;
      span:nth-child(1) {
        color: #555;
      }
      span:nth-child(2) {
        font-size: 12px;
        float: right;
      }
    }
  }
}
</style>