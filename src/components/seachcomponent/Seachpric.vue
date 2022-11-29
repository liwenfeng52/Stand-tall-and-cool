<template>
  <div>
    <div class="sacpric_box">
      <div class="sacpric_left">
        <p>￥{{ Seacparent }}</p>
        <p>原价:<s>￥38890 </s></p>
      </div>
      <div class="sacpric_right" @click="finmoneny">
        支付定金 ￥{{ Seacparent }}
      </div>
    </div>
    <div class="sacpr_fiex">
      <p></p>
    </div>
  </div>
</template>

<script>
import { get } from "../../axios/index";
import { mapState, mapGetters } from "vuex";
import { Dialog } from "vant";
export default {
  props: ["Seacparent", "seaindex"],
  created() {
    // console.log(this.seaindex);
  },
  methods: {
    finmoneny() {
      if (this.registe == "点击登录") {
        Dialog.confirm({
          title: "还未登录",
          message: "是否登录",
        })
          .then(() => {
            // on confirm
            this.$router.push({ name: "register" });
          })
          .catch(() => {});
      } else {
        this.$store.commit("setgift", this.seaindex);
        this.$router.push({ name: "mycart" });
      }
    },
  },
  computed: {
    ...mapState(["my", "registe"]),
  },
  created() {
    // console.log(this);
  },
};
</script>

<style lang="less">
.sacpric_box {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 60px;
  width: 100%;
  background: white;
  z-index: 10000;
  border-top: 1px #ccc solid;
  padding: 5px 15px;
  display: flex;
  .sacpric_left {
    width: 35%;
    & p:nth-child(1) {
      width: 100%;
      text-align: center;
      font-size: 25px;
      color: red;
      font-weight: bold;
    }
    & p:nth-child(2) {
      text-align: center;
      width: 100%;
      font-size: 12px;
    }
  }
  .sacpric_right {
    width: 65%;
    line-height: 49px;
    color: white;
    text-align: center;
    background: #793cd0;
    border-radius: 28px;
  }
}
</style>