<template>
  <!-- 最新课程 -->
  <div>
    <!-- 头部 -->
    <div class="newset_top">
      <div class="newsetop_left">
        <p></p>
        <p>最新课程</p>
      </div>
      <div class="newsetop_right">
        查看更多
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 图片和说明 -->
    <div class="newset_box">
      <div class="newset_loades" v-if="isnew">
        <van-loading type="spinner" color="#1989fa" />
      </div>
      <div
        class="newset_bot"
        v-for="item in newlis"
        :key="item.id"
        v-if="!isnew"
        @click="clicknewset(item.id)"
      >
        <div class="newsetbot_top">
          <div class="newsetbotop_left">
            <img :src="item.img" alt="" />
          </div>
          <div class="newsetbotop_right">
            <p>{{ item.name }}</p>
            <div class="newsetname">
              <p>
                {{ item.data }}
              </p>
            </div>
          </div>
        </div>
        <div class="newsetbot_bot">
          <div class="newsetbots_left">
            <p>直播间</p>
            <p><van-icon name="fire" color="red" />{{ item.num }}</p>
          </div>
          <div class="newsetbots_right">
            <p v-for="index in item.children" :key="index.id">
              <img :src="index.imgs" alt="" />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "../../axios/index";
export default {
  data() {
    return {
      isnew: true,
      newlis: [],
    };
  },
  created() {
    get("newsest").then((data) => {
      if (data.data.result) {
        setTimeout(() => {
          this.isnew = false;
        }, 500);
        data.data.result.forEach((item, inde) => {
          let obj = {};
          obj.children = item.children;
          obj.name = item.name;
          obj.data = item.deta;
          obj.id = item.id;
          obj.num = item.num;
          obj.img = item.img;
          this.newlis.push(obj);
        });
      }
      //   console.log(this.newlis);
    });
  },
  methods: {
    clicknewset(e) {
      this.$router.push({ name: "seach", params: { id: e } });
    },
  },
};
</script>

<style lang="less">
.newset_loades {
  width: 100%;
  text-align: center;
}
.newset_top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  .newsetop_left {
    display: flex;
    height: 20px;
    line-height: 20px;
    & p:nth-child(1) {
      height: 20px;
      width: 5px;
      background: #28b28b;
      margin-right: 10px;
    }
    & p:nth-child(2) {
      font-size: 15px;
      font-weight: bold;
    }
  }
  .newsetop_right {
    text-align: center;
    font-size: 11px;
    line-height: 20px;
  }
}
.newset_bot {
  width: 100%;
  border-bottom: 1px #e8e8e8 solid;
  margin-bottom: 10px;
  .newsetbot_top {
    width: 100%;
    display: flex;

    .newsetbotop_left {
      width: 40%;
      height: 90px;
      img {
        height: 90px;
        width: 100%;
        background-size: cover;
        border-radius: 2px;
      }
    }
    .newsetbotop_right {
      width: 60%;
      height: 90%;
      padding: 0 0px 0 10px;
      //   overflow: hidden;
      & p:nth-child(1) {
        width: 100%;
        font-size: 14px;
        font-weight: bold;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .newsetname {
        width: 100%;
        padding: 10px;
        background-color: #f7fafa;
        margin-top: 19px;
        p {
          transition: all 0.3s ease 0s;
          color: rgb(102, 102, 102);
          font-size: 12px;
          // line-height: 0.17rem;
          // max-width: 1.56rem;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
          white-space: normal;
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
.newsetbot_bot {
  display: flex;
  height: 20px;
  line-height: 20px;
  justify-content: space-between;
  overflow: hidden;
  margin: 15px 0;
  .newsetbots_left {
    width: 40%;
    display: flex;
    & p:nth-child(1) {
      width: 35%;
      padding: 2px 5px;
      font-size: 10px;
      line-height: 12px;
      border: 1px red solid;
      border-radius: 13px;
      color: red;
    }
    & p:nth-child(2) {
      width: 50%;
      font-size: 10px;
      margin-left: 10px;
      color: #9d9d9d;
    }
  }
}
.newsetbots_right {
  display: flex;
  flex-direction: row-reverse;
  width: 60%;
  height: 20px;
  & p {
    right: 0;
    width: 20px;
    height: 20px;
    margin-left: 10px;
    img {
      width: 100%;
      height: 100%;
      background-size: 100% 100%;
      border-radius: 50%;
    }
  }
}
</style>