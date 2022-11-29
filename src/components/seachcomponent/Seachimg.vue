<template>
  <div>
    <div class="sechimg">
      <img :src="item.imgs" alt="" v-for="item in seachimglis" :key="item.id" />
    </div>
  </div>
</template>

<script>
import { get } from "../../axios";
export default {
  props: ["seaimg"],
  data() {
    return {
      seachimglis: "",
      index: 1,
    };
  },
  created() {
    // if (this.seaimg == null) {
    //   this.seaimg = 1;
    // }
    // console.log(this.seaimg);
    this.index = this.seaimg;
    get("newchild").then((data) => {
      if (data.data.code == 200) {
        data.data.result.forEach((item) => {
          if (item.id == this.index) {
            this.seachimglis = item.imgs;
          }
        });
      }
    });
  },
};
</script>

<style lang="less">
.sechimg {
  width: 100%;
  padding: 0 15px;
  margin-bottom: 20px;
  img {
    width: 100%;
    //height: 330px;
    background-size: 100% 100%;
  }
}
</style>