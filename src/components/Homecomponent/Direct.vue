<template>
  <!-- 免费直播 -->
  <div>
    <div class="direct">
      <div class="direct_top">
        <div class="directop_left">
          <p></p>
          <p>免费直播</p>
        </div>
        <div class="directoop_right">
          查看更多
          <van-icon name="arrow" />
        </div>
      </div>
      <!--  -->
      <div class="direct_bott">
        <div class="loadin" v-if="!isloading">
          <van-loading type="spinner" color="#28b28b" />
        </div>

        <van-swipe :loop="false" :width="300" v-if="isloading">
          <van-swipe-item v-for="item in dirlis" :key="item.id">
            <div class="diractive">{{ item.tiem }}</div>
            <div class="imgtop" @click="homedirect(item.id)">
              <img :src="item.img" alt="" />
            </div>
            <div class="direct_name">
              {{ item.title }}
            </div>
            <div class="direct_begin">
              <div class="directbegin_top">
                <p>
                  <img :src="item.authimg" alt="" />
                </p>
                <p>{{ item.name }}</p>
              </div>
              <div>开播提醒</div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.direct {
  width: 100%;
}
.loadin {
  width: 100%;
  text-align: center;
  line-height: 100px;
}
.direct .van-swipe__indicators {
  display: none;
}
.direct .van-swipe-item {
  height: auto;
}
/* 免费直播头部 */
.direct_top {
  position: relative;
  margin-bottom: 10px;
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.directop_left {
  display: flex;
}
.directop_left p:nth-child(1) {
  height: 20px;
  width: 5px;
  background: yellowgreen;
  margin-right: 10px;
}
.directop_left p:nth-child(2) {
  font-size: 15px;
  font-weight: bold;
}
.directoop_right {
  font-size: 12px;
  line-height: 20px;
}
/* 免费直播间 */
.direct_bott {
  width: 100%;
}
.imgtop {
  width: 290px;
  height: 150px;
}
.imgtop img {
  width: 100%;
  height: 100%;
  background-size: cover;
}
.direct_name {
  //   height: 100px;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-top: 10px;
  font-weight: bold;
  font-size: 15px;
  width: 100%;
}
.direct_begin {
  margin-top: 10px;
  //   margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
}
.direct_begin div:nth-child(2) {
  //   height: 18px;
  //   width: 60px;
  line-height: 18px;
  text-align: center;
  color: white;
  padding: 3px 10px;
  background: #28b28b;
}
.directbegin_top {
  width: 60%;
  height: 20px;
  display: flex;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.directbegin_top p:nth-child(1) {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 5px;
}
.directbegin_top p:nth-child(2) {
  color: #c5c5c5;
}
.diractive {
  width: 290px;
  position: absolute;
  left: 5px;
  top: 135px;
  //   width: 100%;
  height: 20px;
  padding-left: 10px;
  font-size: 12px;
  line-height: 20px;
  color: white;
  background: rgba(109, 106, 106, 0.9);
}
</style>
<script>
import { get } from "../../axios/index";
export default {
  data() {
    return {
      isloading: false,
      dirlis: [],
    };
  },
  created() {
    get("getext").then((data) => {
      if (data.data) {
        setTimeout(() => {
          this.isloading = true;
        }, 500);
        data.data.result.forEach((item) => {
          // console.log(item);
          let obj = {};
          obj.img = item.img;
          obj.authimg = item.authimg;
          obj.name = item.name;
          obj.tiem = item.tiem;
          obj.title = item.title;
          obj.id = item.id;
          this.dirlis.push(obj);
        });
      }
      // console.log(data.data.result);
    });
  },
  methods: {
    homedirect(e) {
      this.$router.push({ name: "homefiree", params: { id: e } });
      // console.log("要看免费直播");
    },
  },
};
</script>
