<template>
  <div>
    <div class="mymoney_top">
      <van-nav-bar
        title="充值页面"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="mymoney_headt">
      <p>{{ vxmemoney }}</p>
      <p>余额还剩</p>
      <div class="my_butt">
        <van-button type="primary" @click="showPopup">充值按钮</van-button>
        <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
          <div class="inpu">
            <input
              type="text"
              onkeyup="value=value.replace(/[^\d.]/g,'')"
              v-model="num"
              placeholder="输入金额"
            />
          </div>
          <button @click="myshow">确定</button>
        </van-popup>
      </div>
      <!-- <div></div> -->
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { mapState } from "vuex";
export default {
  data() {
    return {
      show: false,
      num: null,
    };
  },
  methods: {
    onClickLeft() {
      // this.$router.push({ name: "my" });
      this.$router.go(-1);
    },
    showPopup() {
      this.show = true;
    },
    myshow() {
      if (this.num == null) {
        return;
      } else {
        Dialog.alert({
          title: "充值成功",
        }).then(() => {
          this.$store.commit("setmoney", this.num);
          this.show = false;
          // console.log(this.vxmemoney);
          localStorage.setItem("menoney", this.vxmemoney);
        });
      }
    },
  },
  computed: {
    ...mapState(["vxmemoney"]),
  },
  created() {
    let menoney = localStorage.getItem("menoney");
    if (this.vxmemoney == 0) {
      this.$store.commit("setmoney", menoney);
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   // console.log(to, "to");
  //   // console.log(from);
  //   if (from.name == "my" || from.name == "mycart") {
  //     next();
  //   }
  // },
};
</script>

<style lang="less">
.mymoney_headt {
  width: 100%;
  text-align: center;
  & p:nth-child(1) {
    margin-top: 50px;
    font-size: 25px;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-weight: bold;
    color: red;
  }
  & p:nth-child(2) {
    width: 100%;
    margin-top: 10px;
  }
  .my_butt {
    width: 100%;
    margin-top: 20px;
  }
  .inpu {
    width: 100%;
    padding: 20px 50px;

    input {
      border: none;
      border-bottom: 1px #ccc solid;
      width: 100%;
      height: 15px;
    }
  }
}
</style>