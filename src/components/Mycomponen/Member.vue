<template>
  <div>
    <div class="member_top">
      <div class="member_xin" @click="clickmembr">
        <p>{{ my }}</p>
      </div>
    </div>
    <div class="member_bot">
      <div
        class="member_p"
        v-for="item in memberlis"
        :key="item.id"
        @click="catclick(item.id)"
      >
        <p :class="item.icon"></p>
        <p>{{ item.name }}</p>
      </div>
    </div>
    <div class="show" v-if="ishow">
      <p>{{ showname }}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      member: "",
      ishow: false,
      showname: "还没登录请登录",
      memberlis: [
        {
          id: "1",
          name: "下载管理",
          icon: "bi-save2",
        },
        {
          id: "2",
          name: "购物车",
          icon: "bi-cart2",
        },
        {
          id: "3",
          name: "优惠券",
          icon: "bi-ticket-perforated",
        },
        {
          id: "4",
          name: "钱包余额",
          icon: "bi-credit-card-2-back",
        },
      ],
    };
  },
  computed: {
    ...mapState(["registe", "my"]),
  },
  created() {
    // console.log(this.$store.commit("setmy", 1));
    // console.log(this.my);
  },
  methods: {
    clickmembr() {
      if (this.registe == "点击登录") {
        this.ishow = true;
        this.showname = "还没登录请登录";
        setTimeout(() => {
          this.ishow = false;
        }, 1000);
      } else if (this.registe == "登录成功" && this.my != "已成为会员") {
        this.ishow = true;
        this.showname = "购买成功";
        this.$store.commit("setmy", "已成为会员");
        localStorage.setItem("my", "已成为会员");
        setTimeout(() => {
          this.ishow = false;
        }, 1000);
      } else if (this.my == "已成为会员") {
        this.ishow = true;
        this.showname = "已是会员";
        // this.member = "已成为会员";
        this.$store.commit("setmy", "已成为会员");
        setTimeout(() => {
          this.ishow = false;
        }, 1000);
      }
    },
    catclick(e) {
      if(e==1){
        this.$router.push({name:"filter"})
      }else
      if (e == 2) {
        this.$router.push({ name: "mycart" });
      } else if (e == 4) {
        if (this.registe == "点击登录") {
          this.$dialog
            .confirm({
              title: "未登录",
              message: "登录才能操作",
            })
            .then(() => {
              this.$router.push({ name: "register" });
            })
            .catch(() => {
              return;
            });
        } else {
          this.$router.push({ name: "mymoney" });
        }
      }
    },
  },
  mounted() {
    let registe = localStorage.getItem("registe");
    let my = localStorage.getItem("my");
    if (registe) {
      this.$store.commit("setregiste", registe);
      if (my) {
        // console.log(my);
        this.$store.commit("setmy", my);
      }
    }
    // console.log(this.registe);
  },
};
</script>

<style lang="less">
.member_top {
  width: 100%;
  padding: 0 15px;
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
.show {
  position: fixed;
  top: 200px;
  left: 0;
  width: 100%;
  //   height: 100px;
  padding: 0 20px;
  p {
    height: 80px;
    width: 100%;
    text-align: center;
    line-height: 80px;
    border-radius: 25px;
    color: #8f6a45;
    background-image: linear-gradient(to right, #fbedd1, #f0d9b1, #e5c28e);
  }
}
.member_bot {
  margin-top: 20px;
  display: flex;
  width: 100%;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  & p:nth-child(1) {
    flex: 1;
    text-align: center;
    font-size: 20px;
    margin-bottom: 6px;
  }
  & p:nth-child(2) {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #cacaca;
    // margin-bottom: 5px;
  }
}
</style>