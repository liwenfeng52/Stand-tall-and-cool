<template>
  <div>
    <!-- 开关-->
    <div class="register">
      <div class="regis_van_box">
        <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
      </div>

      <div class="isregin" @click="clickname">{{ clallname }}</div>
      <!-- 登录 -->
      <div
        class="animate__animated animate__backInDown register_top"
        ref="claName"
        v-if="!iskey"
      >
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="phone"
            label="手机号"
            placeholder="手机号"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
          />
          <div style="margin: 16px">
            <van-button round block type="info" native-type="submit">{{
              sub
            }}</van-button>
          </div>
        </van-form>
      </div>
      <!-- 注册 -->
      <div
        class="animate__animated animate__backInDown register_bot"
        ref="bot"
        v-if="iskey"
      >
        <van-form @submit="onSubmit">
          <van-field
            v-model="userName"
            name="userName"
            label="用户名"
            placeholder="用户名"
          />
          <van-field
            v-model="username"
            name="phone"
            label="手机号"
            placeholder="手机号"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
          />
          <div style="margin: 16px">
            <van-button round block type="info" native-type="submit">{{
              sub
            }}</van-button>
          </div>
        </van-form>
      </div>
      <div class="rem" v-if="isren">
        <div class="rem_box">{{ remname }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { post, get } from "../axios/index";
export default {
  created() {
    console.log(this.$refs.van);
  },
  mounted() {},
  data() {
    return {
      userName: "",
      username: "",
      password: "",
      clallname: "点击注册",
      iskey: false,
      isren: false,
      remname: "",
      sub: "登录",
    };
  },
  methods: {
    onSubmit(values) {
      if (this.username.length != 0 && this.password.length != 0) {
        if (values.userName) {
          this.reginspost("register", values);
        } else {
          this.reginspost("login", values);
        }
      } else {
        confirm("还没写完");
      }
    },
    reginspost(e, i) {
      post(e, i).then((data) => {
        let item = data.data.msg;
        //
        if (item == "登录成功") {
          this.remname = item;
          this.isren = true;
          this.$store.commit("setregiste", item);
          localStorage.setItem("registe", "登录成功");
          setTimeout(() => {
            this.isren = false;
            this.$store.state.registe = item;
            this.$router.push({ name: "my" });
            // this.$router.go(-1);
          }, 500);
        } else if (item == "注册成功") {
          this.remname = item;
          this.isren = true;
          setTimeout(() => {
            this.iskey = false;
            this.isren = false;
          }, 1000);
        } else {
          this.remname = item;
          this.isren = true;
          setTimeout(() => {
            this.iskey = false;
            this.isren = false;
            this.sub = "登录";
            this.username = "";
            this.password = "";
          }, 1000);
        }
      });
    },
    onClickLeft() {
      // console.log(1);
      this.$router.push({ name: "my" });
    },
    clickname() {
      let van = this.$refs.claName;
      let bot = this.$refs.bot;
      if (this.iskey) {
        this.iskey = false;
        this.clallname = "点击注册";
        this.sub = "登录";
      } else {
        this.iskey = true;
        this.clallname = "点击登录";
        van.className = "animate__animated  animate__backOutDown register_top";
        this.sub = "注册";
      }
    },
  },
};
</script>

<style lang="less">
.register {
  //   position: relative;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background-image: url("../imgs/1.webp");
  background-size: 100% 100%;
  .register_top {
    width: 100%;
    position: absolute;
    top: 35%;
    left: 0;
    .van-form {
      .van-field {
        background-color: white;
        opacity: 0.7;
      }
    }
  }
  .isregin {
    position: absolute;
    width: 100%;
    // height: 100%;
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    top: 100px;
    left: 0;
    z-index: 1000;
    color: #000;
  }
  .register_bot {
    width: 100%;
    position: absolute;
    top: 35%;
    left: 0;
    .van-form {
      .van-field {
        background-color: white;
        opacity: 0.7;
      }
    }
  }
  .rem {
    position: absolute;
    top: 165px;
    height: 100px;
    width: 100%;
    // background-color: red;
    padding: 20px;
    .rem_box {
      width: 100%;
      height: 100%;
      background-color: royalblue;
      border-radius: 25px;
      text-align: center;
      line-height: 60px;
    }
  }
  .regis_van_box {
    .van-nav-bar__content {
      background-color: #3b2a78;
      border: none;
      opacity: 0.7;
    }
    .van-nav-bar {
      background-color: none;
    }
    .van-hairline--bottom {
      background-color: none;
    }
    .van-nav-bar__text {
      color: #52bbe7;
    }
  }
}
</style>