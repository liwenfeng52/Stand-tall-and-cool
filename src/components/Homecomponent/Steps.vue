<template>
  <div>
    <div class="steps">
      <van-swipe class="my-swipe" :autoplay="2500" indicator-color="white">
        <van-swipe-item v-for="item in stepslis" :key="item.id"
          ><img :src="item.img" alt=""
        /></van-swipe-item>
      </van-swipe>
    </div>
    <!--  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      stepslis: [
        {
          id: 1,
          img: "http://127.0.0.1:3000/static/imgs/1.jpg",
        },
        {
          id: 2,
          img: "http://127.0.0.1:3000/static/imgs/2.jpg",
        },
        {
          id: 3,
          img: "http://127.0.0.1:3000/static/imgs/3.jpg",
        },
        {
          id: 4,
          img: "http://127.0.0.1:3000/static/imgs/4.jpg",
        },
      ],
    };
  },
};
</script>

<style>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.steps .van-swipe__indicators {
  display: none;
}
.van-swipe-item {
  height: 160px;
  width: 100%;
  background: white !important;
  padding: 5px;
}
.van-swipe-item img {
  height: 100%;
  width: 100%;
  background-size: cover;
  border-radius: 5px;
}
/* .van-tabs__content {
  width: 95%;
} */
/* 不是组件 */
.steps {
  margin-top: 5px;
}
</style>