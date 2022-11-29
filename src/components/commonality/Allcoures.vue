<template>
  <div>
    <!--  全部课程头部 -->
    <div class="newset_top">
      <div class="newsetop_left">
        <p></p>
        <p>全部课程</p>
      </div>
      <div class="newsetop_right">
        查看更多
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 全部课程详细信息 -->
    <div class="alload" v-if="isall">
      <van-loading type="spinner" color="#28B28B" />
    </div>
    <!-- 盒子 -->
    <div
      class="allcoures_box"
      v-if="!isall"
      v-for="item in alllis"
      :key="item.id"
      @click="isallclick(item.id)"
    >
      <!-- 图片上半部分 -->
      <div class="addbox_img">
        <div class="addboximg_left">
          <img :src="item.img" alt="" />
        </div>
        <div class="addboximg_right">
          <div class="addbox_name">{{ item.name }}</div>
          <div class="addboxright_img">
            <div class="allright">
              <div v-for="ind in item.children" :key="ind.id">
                <img :src="ind.imgs" alt="" />
              </div>
              <p></p>
            </div>
            <div>{{ item.node }}</div>
          </div>
        </div>
      </div>
      <!-- 下面 -->
      <div class="addbox_bot">
        <div class="addboxbot_left">
          <div class="addbotleft_z">直播课</div>
          <p>{{ item.earnest }}</p>
        </div>
        <div class="addboxbot_right">￥{{ item.num }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { get } from "../../axios/index";
export default {
  props: ["allindex"],
  data() {
    return {
      isall: true,
      alllis: [],
    };
  },
  created() {
    get("course").then((data) => {
      // console.log(data);
      if (data.data.code == 200) {
        setTimeout(() => {
          this.isall = false;
        }, 500);
        this.alleach(data.data.result, this.allindex);
      }
    });
  },
  methods: {
    isallclick(e) {
      this.$router.push({ name: "seach", params: { id: e } });
    },
    alleach(e, index) {
      e.forEach((item, inde) => {
        if (index == 1) {
          let obj = {};
          obj.children = item.children;
          obj.course = item.course;
          obj.deta = item.deta;
          obj.id = item.id;
          obj.img = item.img;
          obj.money = item.money;
          obj.name = item.name;
          obj.node = item.node;
          obj.num = item.num;
          obj.earnest = item.earnest;
          this.alllis.push(obj);
        }
        if (index == 2) {
          if (item.course == "平面") {
            let obj = {};
            obj.children = item.children;
            obj.course = item.course;
            obj.deta = item.deta;
            obj.id = item.id;
            obj.img = item.img;
            obj.money = item.money;
            obj.name = item.name;
            obj.node = item.node;
            obj.num = item.num;
            obj.earnest = item.earnest;
            this.alllis.push(obj);
          }
        }
        if (index == 3) {
          if (item.course == "绘画") {
            let obj = {};
            obj.children = item.children;
            obj.course = item.course;
            obj.deta = item.deta;
            obj.id = item.id;
            obj.img = item.img;
            obj.money = item.money;
            obj.name = item.name;
            obj.node = item.node;
            obj.num = item.num;
            obj.earnest = item.earnest;
            this.alllis.push(obj);
          }
        }
        if (index == 4) {
          if (item.course == "电商") {
            let obj = {};
            obj.children = item.children;
            obj.course = item.course;
            obj.deta = item.deta;
            obj.id = item.id;
            obj.img = item.img;
            obj.money = item.money;
            obj.name = item.name;
            obj.node = item.node;
            obj.num = item.num;
            obj.earnest = item.earnest;
            this.alllis.push(obj);
          }
        }
        if (index == 5) {
          if (item.course == "ul") {
            let obj = {};
            obj.children = item.children;
            obj.course = item.course;
            obj.deta = item.deta;
            obj.id = item.id;
            obj.img = item.img;
            obj.money = item.money;
            obj.name = item.name;
            obj.node = item.node;
            obj.num = item.num;
            obj.earnest = item.earnest;
            this.alllis.push(obj);
          }
        }
      });
      //   console.log(this.alllis);
    },
  },
};
</script>
<style lang="less">
// 头部
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
//
// 加载
.alload {
  width: 100%;
  text-align: center;
  line-height: 50px;
  height: 50px;
}
.allcoures_box {
  margin-top: 10px;
  width: 100%;
  border-bottom: 1px #e8e8e8 solid;
  .addbox_img {
    width: 100%;
    display: flex;
    .addboximg_left {
      width: 40%;
      height: 90px;
      img {
        border-radius: 2px;
        height: 100%;
        width: 100%;
        background-size: cover;
      }
    }
  }
  .addboximg_right {
    width: 60%;
    padding: 0 0 0 10px;
    .addbox_name {
      font-size: 15px;
      font-weight: bold;
    }
  }
  .addboxright_img {
    margin-top: 20px;
    width: 100%;
    height: 20px;
    line-height: 20px;
    display: flex;
    color: #b1b1b1;
    justify-content: space-between;
    overflow: hidden;
    .allright {
      width: 50%;
      display: flex;
      div {
        width: 20px;
        height: 20px;
        margin-left: 10px;
        border-radius: 50%;
        overflow: hidden;
        img {
          height: 20px;
          width: 20px;
          background-size: 100% 100%;
        }
      }
      p {
        font-size: 10px;
        margin-left: 10px;
      }
    }
    & div:nth-child(2) {
      font-size: 10px;
    }
  }
}
.addbox_bot {
  margin: 15px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .addboxbot_left {
    display: flex;
    height: 20px;
    line-height: 20px;
    .addbotleft_z {
      padding: 2px 5px;
      border-radius: 10px;
      border: 1px red solid;
      font-size: 10px;
      line-height: 12px;
      color: red;
    }
    p {
      font-size: 10px;
      margin-left: 10px;
      color: #b1b1b1;
    }
  }
}
.addboxbot_right {
  font-size: 15px;
  font-weight: bold;
  color: #ea4335;
}
</style>

