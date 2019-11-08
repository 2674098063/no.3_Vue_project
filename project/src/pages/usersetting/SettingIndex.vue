<template>
  <div class="setting">
    <Login />
    <div class="address">
      <van-cell value is-link border to="/address">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <div class="fl">
            <van-icon name="location-o" class="icon_color" />
            <span class="custom-title">地址</span>
          </div>
        </template>
      </van-cell>
      <van-cell value is-link border>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <div class="fl">
            <van-icon name="shopping-cart-o" class="icon_color" />
            <span class="custom-title">购买记录</span>
          </div>
        </template>
      </van-cell>
    </div>
    <div class="customer">
      <van-cell value is-link border class="kf">
        <template slot="title">
          <div class="fl">
            <van-icon name="gem-o" class="icon_color" />
            <span class="custom-title">会员中心</span>
          </div>
        </template>
      </van-cell>
      <van-cell value is-link border class="kf">
        <template slot="title">
          <div class="fl">
            <van-icon name="service-o" class="icon_color" />
            <span class="custom-title">在线客服</span>
          </div>
        </template>
      </van-cell>

      <van-cell value is-link border class="kf">
        <template slot="title">
          <div class="fl">
            <van-icon name="down" class="icon_color" />
            <span class="custom-title">下载APP</span>
          </div>
        </template>
      </van-cell>
      <van-cell value is-link border class="kf">
        <template slot="title">
          <div class="fl">
            <van-icon name="description" class="icon_color" />
            <span class="custom-title">规则详情</span>
          </div>
        </template>
      </van-cell>
    </div>
    <div class="set">
      <van-cell value is-link border class="kf">
        <template slot="title">
          <div class="fl">
            <van-icon name="share" class="icon_color" />
            <span class="custom-title">分享好友</span>
          </div>
        </template>
      </van-cell>
      <van-cell value is-link border class="kf">
        <template slot="title">
          <div class="fl">
            <van-icon name="comment-o" class="icon_color" />
            <span class="custom-title">意见反馈</span>
          </div>
        </template>
      </van-cell>
      <van-cell value is-link border class="kf">
        <template slot="title">
          <div class="fl">
            <van-icon name="setting-o" class="icon_color" />
            <span class="custom-title">设置</span>
          </div>
        </template>
      </van-cell>
      <van-cell value is-link border class="kf" @click="logout">
        <template slot="title">
          <div class="fl">
            <van-icon name="fail" class="icon_color_red" />
            <span class="custom-title">退出登陆</span>
          </div>
        </template>
      </van-cell>
    </div>
  </div>
</template>
<script>
import Login from "./Login";
export default {
  components: {
    Login
  },
  methods: {
    logout() {
      // document.cookie = "key= ";

      var d = new Date();
      d.setTime(d.getTime() + -1 * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = "key=" + "; " + expires;
      window.location.href = "http://localhost:8081";
      window.location.reload();
    }
  }
};
</script>
<style lang="scss" scoped>
.setting {
  background: #ebebeb;
  height: 100%;
  .icon_color {
    color: #0085ff;
    margin-right: 5px;
  }
  .icon_color_red {
    color: red;
    margin-right: 5px;
  }
  .address {
    margin-bottom: 20px;
  }
  .customer {
    margin-bottom: 30px;
  }
  .set {
    margin-bottom: 50px;
  }
}
.fs12 {
  font-size: 12px;
}
.fl {
  float: left;
}
</style>