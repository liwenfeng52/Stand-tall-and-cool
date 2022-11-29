<template >
  <div>
    <div class="seach_top">
      <div class="seachtop_left" @click="homeclick">
        <van-icon name="arrow-left" size="20px" />
      </div>
      <div class="seachtop_con">站酷高高手</div>
      <div class="seachtop_right">
        <van-icon name="cart-o" size="20px" @click="giftclick" :dot="isdot" />
        <van-icon name="share-o" size="20px" style="margin-left: 20px" />
      </div>
    </div>
    <!-- 图片 -->
    <div class="seach_img">
      <img :src="imgs" alt="" />
      <div class="seachimg_name">
        <p>A{{ name }}</p>
      </div>
      <div class="seacgclick">
        <van-icon name="play-circle" color="white " size="24" />
        <p>免费试学</p>
      </div>
    </div>
    <!-- 人物头像 -->
    <div class="seach_ren">
      <div class="seachren_top">
        <!-- 老师介绍 -->
        <div v-for="item in children" :key="item.id">
          <p><img :src="item.imgs" alt="" /></p>
          <p>{{ item.name }}</p>
        </div>
      </div>
      <!-- 时间和直播课 -->
      <div class="seachren_bot">
        <div>
          <van-icon
            name="clock-o"
            color="#57AF8D"
            size="18"
            style="margin-top: 1px"
          />
          <p>{{ tiem }}</p>
        </div>
        <div>{{ jie }}节直播</div>
        <div>
          <van-icon name="bag-o" style="margin-top: 1px" />
          <p>买1赠1</p>
        </div>
      </div>
    </div>
    <!-- 分割线 -->
    <div class="corss"></div>
    <!-- 科目 -->
    <div class="seachbox">
      <van-tabs
        v-model="active"
        scrollspy
        color="#4FC08D"
        line-width="20"
        sticky
        offset-top="41.6px"
        title-active-color="#515151"
        title-inactive-color="#ccc"
      >
        <van-tab title="课程介绍">
          <seachild></seachild>
          <seachimg :seaimg="index"></seachimg>
        </van-tab>
        <van-tab title="课程目录">
          <seachpage :seapage="index"></seachpage>
        </van-tab>
        <van-tab title="往期作业">
          <busy></busy>
        </van-tab>
        <van-tab title="学生评论">
          <busys></busys>
        </van-tab>
      </van-tabs>
    </div>
    <seachpric v-if="ispric" :Seacparent="moneny" :seaindex="index"></seachpric>
    <div class="iseachp" v-if="isach">
      <p>{{ isname }}</p>
    </div>
  </div>
</template>

<script>
import Seachild from "../components/seachcomponent/Seachild.vue";
import Seachimg from "../components/seachcomponent/Seachimg.vue";
import Seachpage from "../components/seachcomponent/Seachpage.vue";
import Busy from "../components/seachcomponent/Busy.vue";
import Busys from "../components/seachcomponent/Busys.vue";
import Seachpric from "../components/seachcomponent/Seachpric.vue";
import { get } from "../axios/index";
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      active: 1,
      // 获取点击传过来id
      index: 1,
      imgs: "",
      name: "",
      tiem: "",
      jie: "",
      ispric: false,
      // 渲染页面
      children: [],
      isach: false,
      isname: "",
      isdot: false,
      // 价格
      moneny: 0,
    };
  },
  created() {
    let registe = localStorage.getItem("registe");
    let my = localStorage.getItem("my");
    if (registe) {
      this.$store.commit("setregiste", registe);
      if (my) {
        // console.log(my);
        this.$store.commit("setmy", my);
      }
    }
    //收藏本地
    let gift = JSON.parse(localStorage.getItem("gift"));
    if (gift) {
      gift = new Set(gift);
      let lis = [...gift];
      for (let i = 0; i < lis.length; i++) {
        this.$store.commit("setgift", lis[i]);
      }
    }
    this.index = this.$route.params.id;
    if (this.index != undefined) {
      localStorage.setItem("index", this.index);
    }
    let index = localStorage.getItem("index");
    this.index = index;
    get("newchild").then((data) => {
      if (data.data.code == 200) {
        data.data.result.forEach((item) => {
          if (item.id == this.index) {
            // console.log(item);
            this.imgs = item.img;
            this.children = item.children;
            this.tiem = item.tiem;
            this.name = item.name;
            this.jie = item.num;
          }
        });
      }
    });
    get("course").then((data) => {
      data.data.result.forEach((item) => {
        if (item.id == this.index) {
          this.moneny = item.num;
        }
      });
    });
    for (let i = 0; i < this.gift.length; i++) {
      if (this.gift[i] == this.$route.params.id) {
        this.isdot = true;
      }
    }
  },
  // 计算属性
  computed: {
    ...mapState(["vuextiem", "registe", "my", "gift"]),
  },
  // 调用方法
  methods: {
    homeclick() {
      this.$router.push("home");
    },
    giftclick() {
      // console.log("gift", this.$route.params.id);
      if (this.registe == "点击登录") {
        this.setTiem("请登录");
      } else if (this.registe == "登录成功") {
        for (let i = 0; i < this.gift.length; i++) {
          if (this.gift[i] == this.$route.params.id) {
            this.setTiem("收藏过");
            return;
          }
        }
        this.$store.commit("setgift", this.$route.params.id);
        this.setTiem("收藏成功");
        this.isdot = true;
        //本地存储
        // 获取页面id
        let index = localStorage.getItem("index");
        // 设置收藏本地
        let gift = [];
        let getgift = JSON.parse(localStorage.getItem("gift"));
        if (getgift) {
          gift = [...new Set(getgift)];
          for (let i = 0; i < gift.length; i++) {
            let key = Number(gift[i]);
            if (index != key) {
              gift.push(index);
            }
          }
          localStorage.setItem("gift", JSON.stringify([...new Set(gift)]));
        } else {
          gift.push(index);
          localStorage.setItem("gift", JSON.stringify(gift));
        }
      }
    },
    setTiem(e) {
      // console.log(e, "paec");
      this.isname = e;
      this.isach = true;
      setTimeout(() => {
        this.isach = false;
      }, 1000);
    },
  },
  components: {
    Seachild,
    Seachimg,
    Seachpage,
    Busy,
    Busys,
    Seachpric,
  },
  mounted() {
    let _this = this;
    window.onscroll = function (e) {
      // let scrtop =
      //   document.documentElement.scrolltop || document.body.scrolltop;
      let top = e.srcElement.scrollingElement.scrollTop;
      if (top >= 500) {
        _this.ispric = true;
      } else {
        _this.ispric = false;
      }
    };
  },
};
</script>

<style lang="less">
.seach_top {
  position: relative;
  width: 100%;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
  z-index: 1000;
  border-bottom: 1px solid #ccc;
  .seachtop_con {
    // width: 100%;
    text-align: center;
    // position: absolute;
    font-size: 15px;
    font-weight: bold;
    color: #68ba6f;
    text-align: center;
  }
}
.seach_img {
  width: 100%;
  height: 300px;
  margin-top: 42px;
  position: relative;
  img {
    height: 300px;
    width: 100%;
    background-size: cover;
  }
  .seachimg_name {
    position: absolute;
    top: 15px;
    left: 0;
    width: 100%;
    padding: 5px 15px;
    p {
      width: 100%;
      color: white;
      font-size: 25px;
      font-weight: bold;
    }
  }
  .seacgclick {
    padding: 4px 6px 4px 4px;
    background-color: #4fc08d;
    border-radius: 18px;
    position: absolute;
    bottom: 19px;
    right: 15px;
    display: flex;
    vertical-align: middle;
    // line-height: 30px;
    p {
      font-size: 10px;
      font-weight: bold;
      color: white;
      margin-left: 2px;
      margin-top: 3px;
    }
  }
}
.seach_ren {
  width: 100%;
  padding: 0 15px;
  .seachren_top {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
    padding: 10px 0;
    border-bottom: 1px #ccc solid;
    div {
      margin-left: 5px;
      text-align: center;
      height: 70px;
      width: 55px;
      // background-color: red;
      overflow: hidden;
      & p:nth-child(1) {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        overflow: hidden;
        margin-left: 6.25px;
        img {
          height: 100%;
          width: 100%;
          background-size: cover;
        }
      }
      & p:nth-child(2) {
        margin-left: 3px;
        margin-top: 7px;
        text-align: center;
        white-space: nowrap;
        height: 20px;
        width: 50px;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 13px;
      }
    }
  }
}
.seachren_bot {
  display: flex;
  padding: 15px 0;
  width: 100%;
  // align-content: center;
  // justify-content: space-between;
  div {
    display: flex;
  }
  & div:nth-child(1) {
    width: 50%;
    height: 20px;
    line-height: 20px;
    border-right: 1px solid #ccc;
    p {
      font-size: 14px;
      margin-left: 5px;
      color: #ccc;
    }
  }
  & div:nth-child(2) {
    width: 25%;
    height: 20px;
    line-height: 20px;
    // text-align: center;
    color: #ccc;
    font-size: 14px;
    padding-left: 15px;
    border-right: 1px solid #ccc;
  }
  & div:nth-child(3) {
    width: 25%;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    padding-left: 13px;
    color: #68ba6f;
    p {
      margin-left: 2px;
    }
  }
}
.corss {
  width: 100%;
  height: 10px;
  background: #f6f8f8;
}
.seachtab {
  width: 100%;
  // padding: 0 15px;
  .van-tabs__nav {
    border-bottom: 1px #ccc solid;
  }
}
.seachbox {
  width: 100%;
  .van-sticky {
  }
  .van-tabs__content {
    .van-tab__pane {
      margin-top: 12px;
    }
  }
}
.iseachp {
  position: fixed;
  top: 40%;
  width: 100%;
  left: 0;
  padding: 0 30px;
  p {
    height: 50px;
    width: 100%;
    color: red;
    box-shadow: 0 0 10px #ccc;
    background: #4ec9b0;
    border-radius: 25px;
    text-align: center;
    line-height: 50px;
  }
}
</style>