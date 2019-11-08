<template>
  <div>
    <div class="logo">
      <h3>这是个logo</h3>
    </div>
    <van-cell-group class="loginbox">
      <p class="prompt poneText">登陆即自动注册</p>
      <van-field
        class="border_border"
        id="phone"
        v-model="phone"
        placeholder="请输入手机号"
        @blur="registerPhone"
      />
      <p class="prompt pswText">6-20位密码</p>
      <van-field
        class="border_border"
        id="password"
        v-model="password"
        type="password"
        placeholder="请输入密码"
        @blur="registerPasswod"
      />
    </van-cell-group>
    <div class="sub">
      <van-button
        square
        type="primary"
        class="loginbtn"
        @click="login"
        :loading="isloading"
        loading-type="spinner"
      >登陆</van-button>
      <p class="prompt mark">登陆即为已同意《服务协议》和《隐私政策》</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs"; //用于拦截OPTIONS的请求
export default {
  data() {
    return {
      phone: "",
      password: "",
      errorText: "格式错误",
      isloading: false
    };
  },
  methods: {
    registerPhone() {
      var reg = /^1[3-9]\d{9}$/;
      let is = reg.test(this.phone);
      if (is) {
        // document.querySelector(".poneText").style.color = "#58bc58";
      } else {
        this.$dialog
          .alert({
            message: "按照格式填写"
          })
          .then(() => {
            this.phone = "";
          });
      }
    },
    registerPasswod() {
      var reg = /^\S{6,20}$/;
      let is = reg.test(this.phone);
      if (is) {
        // document.querySelector(".pswText").style.color = "#58bc58";
      } else {
        this.$dialog
          .alert({
            message: "密码仅限6-20位"
          })
          .then(() => {
            this.password = "";
          });
      }
    },
    loginError() {
      this.$dialog
        .alert({
          message: "账号、密码错误"
        })
        .then(() => {
          this.phone = "";
          this.password = "";
        });
    },
    login() {
      this.isloading = true;
      setTimeout(() => {
        this.isloading = false;
      }, 4000);
      if (this.phone && this.password) {
        axios
          .post(
            "http://localhost:3000/user",
            qs.stringify({
              tel: this.phone,
              password: this.password
            })
          )
          .then(({ data }) => {
            if (data.indexOf("key") >= 0) {
              let arr = data.split(":");
              window.console.log(arr);
              document.cookie = "key=" + arr[1];
              window.location.href = "http://localhost:8081/#/main/home";
              window.location.reload(location);
            } else {
              this.loginError();
            }
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 160px;
  height: 60px;
  background: #ddd;
  margin: 20px 0;
}
.loginbox {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
}
.border_border {
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 24px;
}
.prompt {
  font-size: 12px;
  margin: 0;
  margin-bottom: 10px;
  padding: 0;
  color: #ccc;
}
.sub {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translateX(-50%);
  .loginbtn {
    padding: 0px 50px;
    border-radius: 5px;
    margin-bottom: 15px;
  }
}
.mark {
  font-size: 16px;
}
</style>