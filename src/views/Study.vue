<template>
  <div>
    <div class="study_top"></div>
    <div class="study_box">
      <div class="study_tiem">
        <div class="studytiem_left">
          <p>{{ stutiem }}</p>
          <p>今天已学习(分钟)</p>
        </div>
        <div class="studytiem_right">
          <p>{{ stutiems }}</p>
          <p>累计学习(小时)</p>
        </div>
      </div>
    </div>
    <div class="stuatten">
      <div>我的关注</div>
      <div>
        {{ index }}门课程<van-icon name="arrow" style="margin-left: 5px" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      index: "1",
      stutiem: 0,
      stutiems: 0,
    };
  },
  computed: {
    ...mapState(["vuextiem"]),
  },
  created() {
    if (this.vuextiem == 0) {
      let tiem = localStorage.getItem("tiem");
      this.$store.commit("settiem", tiem - 0);
    }
    this.stutiem = Math.floor(this.vuextiem / 60);
    this.stutiems = Math.floor(this.vuextiem / 3600);
  },
};
</script>

<style lang="less">
.study_top {
  height: 70px;
  width: 100%;
  background-color: turquoise;
}
.study_box {
  position: relative;
  height: 100px;
  // background-color: red;
  width: 100%;
  padding: 0 15px;
  .study_tiem {
    position: absolute;
    left: 10%;
    right: 10%;
    top: -35px;
    // width: 100%;
    background-color: white;
    box-shadow: 0 0 10px #ccc;
    height: 100px;
    line-height: 100px;
    display: flex;
    text-align: center;
    div {
      position: relative;
      width: 50%;
      & p:nth-child(1) {
        font-size: 25px;
        font-weight: bold;
      }
      & p:nth-child(2) {
        position: absolute;
        width: 100%;
        bottom: 25px;
        left: 0;
        line-height: 0;
        font-size: 10px;
        color: #ccc;
        opacity: 0.7;
      }
    }
  }
}
.stuatten {
  width: 100%;
  padding: 15px;
  border-bottom: 1px #ccc solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & div:nth-child(1) {
    font-size: 15px;
    font-weight: bold;
  }
  & div:nth-child(2) {
    font-size: 10px;
    color: #ccc;
    opacity: 0.7;
  }
}
</style>