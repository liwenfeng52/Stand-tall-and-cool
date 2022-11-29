<template>
  <div class="my">
    <div class="my_top">
      <div class="mytop_left">
        <img :src="registeimg" alt="" />
      </div>
      <div class="mytopright" @click="register">{{ registe }}</div>
    </div>
    <!-- 点击会员 -->
    <member></member>
    <!-- 我的订单 -->
    <!-- 下面其他 -->
    <div class="my_lin"></div>
    <!-- 盒子-->
    <div class="my_box">
      <!-- 循环  -->
      <div
        class="mybox_p"
        v-for="item in mylis"
        :key="item.id"
        @click="myclick(item.id)"
      >
        <div class="myboxp_left">
          <p :class="item.icall"></p>
          <p>{{ item.name }}</p>
        </div>
        <div class="myboxp_right">
          <van-icon name="arrow" size="13" color="#D3D3D3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Member from "../components/Mycomponen/Member.vue";
export default {
  name: "my",
  data() {
    return {
      mylis: [
        {
          id: 1,
          name: "我的订单",
          icall: "bi-journal-text",
        },
        {
          id: 2,
          name: "购物车",
          icall: "bi-cart-dash",
        },
        {
          id: 3,
          name: "钱包余额",
          icall: "bi-wallet2",
        },
      ],
    };
  },
  created() {
    // console.log(this.$store.state.register);
    // console.log(this.register);
  },
  computed: {
    ...mapState(["registe", "registeimg"]),
  },

  methods: {
    register() {
      this.$router.push({ name: "register" });
    },
    myclick(e) {
      if (e == 1) {
        this.$router.push({ name: "myorder" });
      } else if (e == 2) {
        this.$router.push({ name: "mycart" });
      } else if (e == 3) {
        if (this.registe == "点击登录") {
          this.$dialog
            .confirm({
              title: "还未登录",
              message: "是否跳转登录页",
            })
            .then(() => {
              this.$router.push({ name: "register" });
            })
            .catch(() => {});
        } else {
          this.$router.push({ name: "mymoney" });
        }
      }
    },
  },
  components: {
    Member,
  },
  created() {
    let registe = localStorage.getItem("registe");
    let my = localStorage.getItem("my");
    if (registe) {
      this.$store.commit("setregiste", registe);
      if (my) {
        // console.log(my);
        this.$store.commit("setmy", my);
      }
    }
  },
};
</script>

<style lang="less">
.my {
  width: 100%;
  .my_top {
    width: 100%;
    display: flex;
    padding: 15px 20px;
    .mytop_left {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      overflow: hidden;
      background: chartreuse;
      img {
        height: 100%;
        width: 100%;
        background-size: cover;
      }
    }
    .mytopright {
      flex: 1;
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      font-size: 14px;
    }
  }
  .my_lin {
    margin-top: 10px;
    width: 100%;
    height: 6px;
    background: #ccc;
    opacity: 0.3;
  }
  .my_box {
    width: 100%;
    padding: 0 15px;
    .mybox_p {
      padding: 10px 0px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px #ccc solid;
      .myboxp_left {
        display: flex;
        & p:nth-child(1) {
          margin-top: 1.5px;
          margin-right: 10px;
        }
        & p:nth-child(2) {
          font-size: 14px;
        }
      }
    }
  }
}
</style>