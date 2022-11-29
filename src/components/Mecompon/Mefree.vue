<template>
  <div>
    <div class="mefree_top">
      <div class="mefreetop_left">
        <p></p>
        <p>{{ frname }}</p>
      </div>
      <div class="mefreetop_right">查看全部<van-icon name="arrow" /></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { get } from "../../axios/index";
export default {
  props: ["frname"],
  data() {
    return {};
  },
};
</script>

<style lang="less">
.mefree_top {
  // margin-top: 80px;
  width: 100%;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  .mefreetop_left {
    display: flex;
    & p:nth-child(1) {
      width: 5px;
      margin-top: 2px;
      height: 18px;
      margin-right: 10px;
      background-color: #e7c593;
    }
    & p:nth-child(2) {
      font-size: 16px;
      font-weight: bold;
    }
  }
  .mefreetop_right {
    font-size: 14px;
    color: #e7c593;
  }
}
</style>