<template>
  <van-cell class="login" to="/login">
    <template slot="title">
      <div class="contact">
        <img
          class="ssr"
          v-if="data.tel"
          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1926741219,2050346424&fm=26&gp=0.jpg"
        />
        <van-icon name="contact" class="icon_contact" />
      </div>
      <div>
        <span class="custom-title" v-if="data.tel" v-text="data.tel"></span>
        <span class="custom-title" v-else>登陆/注册</span>

        <br />
        <span class="fs12">
          <van-icon name="paid" size="12px" />登陆后享受更多特权
        </span>
      </div>
      <van-icon name="arrow" class="arrow" />
    </template>
  </van-cell>
</template>
<script>
import Axios from "axios";
import qs from "qs"; //用于拦截OPTIONS的请求
export default {
  data() {
    return {
      data: {}
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      let name = "key";
      var strCookie = document.cookie;
      //cookie的保存格式是 分号加空格 "; "
      var arrCookie = strCookie.split("; ");
      let key;
      for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name) {
          key = arr[1];
          Axios.post(
            "http://localhost:3000/tokenKey",
            qs.stringify({
              tokenKey: key
            })
          ).then(({ data }) => {
            this.data = data[0];
          });
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  background: #0085ff;
  position: relative;
  font-size: 22px;
  height: 120px;
  margin-bottom: 20px;
  .contact {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #0af;
    position: relative;
    left: 20px;
    top: 30px;
    overflow: hidden;
    .ssr {
      width: 40px !important;
      height: 40px !important;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: block;
    }

    .icon_contact {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .arrow {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.fs12 {
  font-size: 12px;
}
</style>