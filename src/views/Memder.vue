<template>
  <div>
    <van-nav-bar
      title="会员专区"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
      class="mevute"
    />
    <div class="me_top">
      <div class="member_top">
        <div class="member_xin" @click="clickmembr">
          <p>{{ my }}</p>
        </div>
      </div>
    </div>
    <mefree :frname="frname"></mefree>
    <mebox></mebox>
    <mefree :frname="frvidov" class="videostyle"></mefree>
    <!-- 全部视频 -->
    <allvideo class="allvideotyle"></allvideo>
    <!-- 弹出款 -->
    <div class="me_show" v-if="ishow">
      <p>{{ showname }}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Mefree from "../components/Mecompon/Mefree.vue";
import Mebox from "../components/Mecompon/Mebox.vue";
import Allvideo from "../components/Mecompon/Allvideo.vue";
export default {
  name: "memder",
  data() {
    return {
      member: "登录点击成为会员",
      showname: "还没登录请登录",
      ishow: false,
      showname: "请登录",
      frname: "限免专区",
      frvidov: "会员视频",
    };
  },
  methods: {
    //
    clickchild() {
      this.$router.push("/mederchild");
    },
    // 登录
    clickmembr() {
      if (this.registe == "点击登录") {
        this.showname = "请到登录页登录";
        this.ishow = true;
        setTimeout(() => {
          this.ishow = false;
        }, 1000);
      } else if (this.registe == "登录成功") {
        if (this.my == "点击成为会员") {
          this.showname = "恭喜成为会员";
          this.ishow = true;
          localStorage.setItem("my", "已成为会员");
          this.$store.commit("setmy", "已成为会员");
          setTimeout(() => {
            this.ishow = false;
          }, 1000);
        } else {
          this.showname = "已经成为会员";
          this.ishow = true;
          setTimeout(() => {
            this.showname = "已经成为会员";
            this.ishow = false;
          }, 1000);
        }
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
  watch: {
    registe(a, b) {},
  },
  created() {
    //获取本地数据来改变
    let registe = localStorage.getItem("registe");
    let my = localStorage.getItem("my");
    if (registe) {
      this.$store.commit("setregiste", registe);
      if (my) {
        // console.log(my);
        this.$store.commit("setmy", my);
      } else {
        this.member = "点击成为会员";
      }
    }
  },
  computed: {
    ...mapState(["registe", "my"]),
  },
  components: {
    Mefree,
    Mebox,
    Allvideo,
  },
};
</script>

<style lang="less">
.me_top {
  .member_top {
    width: 100%;
    padding: 10px 15px;
    margin-top: 50px;
    // position: fixed;
    // top: 0px;
    // z-index: 1000;
    .member_xin {
      width: 100%;
      text-align: center;
      padding: 10px;
      p {
        height: 40px;
        line-height: 40px;
        border-radius: 25px;
        color: #8f6a45;
        background-image: linear-gradient(to right, #fbedd1, #f0d9b1, #e5c28e);
      }
    }
  }
}

.me_show {
  position: fixed;
  top: 50%;
  left: 0;
  width: 100%;
  padding: 0 25px;
  p {
    width: 100%;
    height: 80px;
    text-align: center;
    line-height: 80px;
    border-radius: 25px;
    background-image: linear-gradient(to right, #fbedd1, #f0d9b1, #e5c28e);
  }
}
.videostyle {
  margin-top: 30px;
}
.allvideotyle {
  margin-bottom: 80px;
}
.mevute {
  color: red;
}
</style>