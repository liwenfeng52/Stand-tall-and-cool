<template>
  <div>
    <!--横杆 -->
    <div class="secstyle"></div>
    <!-- 头部标签 -->
    <div class="seachpage_top">
      <div class="seachpagetop_left">
        <p></p>
        <p>课程目录</p>
      </div>
      <div class="seachpagetop_right">共6章，34节课，已更新22节</div>
    </div>
    <!--  -->
    <div class="seachpage_box">
      <!--  -->
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item
          :title="item.data"
          :name="item.id"
          size="80"
          title-class="seachpage_prop"
          value-class="seachpage_content"
          v-for="item in arr"
          :key="item.id"
        >
          <!-- 样式 -->
          <div
            class="seachlis"
            v-for="ind in item.keylis"
            :key="ind.id"
            @click="clickpage(ind.vido)"
          >
            <div class="seachlis_top">
              <div class="seachlistop_left">第{{ ind.id }}节</div>
              <div class="seachilstop_right">{{ ind.name }}</div>
            </div>
            <div class="seachlis_bot">
              <div class="seachlisbot_tiem">{{ ind.tiem }}</div>
              <div>{{ ind.currtiem }}</div>
            </div>
          </div>
          <!--  -->
        </van-collapse-item>
      </van-collapse>
    </div>

    <div class="video" v-if="isfvdeo">
      <div class="isvideo">
        <van-icon name="cross" size="22" @click="clickvideo" />
      </div>
      <video :src="isvdeo" controls></video>
    </div>
  </div>
</template>

<script>
import { get } from "../../axios";
import { mapState, mapGetters } from "vuex";
export default {
  props: ["seapage"],
  data() {
    return {
      activeName: "1",
      index: 1,
      arr: "",
      isvdeo: "",
      isfvdeo: false,
      tiem: "",
      vxtiem: "",
    };
  },
  created() {
    // 时间
    if (this.vuextiem == 0) {
      let tiem = localStorage.getItem("tiem");
      this.$store.commit("settiem", tiem - 0);
    }
    this.index = this.seapage;
    let index = getSelection("index");
    get("vieo").then((data) => {
      if (data.data.code == 200) {
        data.data.result.forEach((item) => {
          if (item.id == this.index || index) {
            this.arr = [...item.children];
          }
        });
      }
    });
  },
  mounted() {},
  methods: {
    //视频开启
    clickpage(e) {
      this.vxtiem = this.vuextiem;
      this.tiem = setInterval(() => {
        this.vxtiem++;
      }, 1000);
      this.isfvdeo = true;
      this.isvdeo = e;
    },
    //视频关闭
    clickvideo() {
      clearInterval(this.tiem);
      this.$store.commit("settiem", this.vxtiem);
      // console.log(this.vuextiem);
      this.isfvdeo = false;
      localStorage.setItem("tiem", this.vxtiem);
    },
  },
  computed: {
    //
    ...mapState(["vuextiem"]),
  },
};
</script>

<style lang="less">
.video {
  position: fixed;
  top: 30%;
  left: 0;
  width: 100%;
  height: 250px;
  background: #ccc;
  video {
    height: 250px;
    width: 100%;
  }
  .isvideo {
    position: relative;
    // top: 34px;
    // background: red;
    text-align: right;
  }
}
.secstyle {
  width: 100%;
  height: 10px;
  background: #f6f8f8;
}
.seachpage_top {
  margin-top: 20px;
  width: 100%;
  padding: 0 15px;
  // margin-bottom: 60px;
  .seachpagetop_left {
    width: 100%;
    height: 20px;
    line-height: 20px;
    display: flex;
    & p:nth-child(1) {
      margin-top: 1px;
      height: 16px;
      width: 5px;
      background: #28b28b;
      margin-right: 10px;
    }
    & p:nth-child(2) {
      font-size: 20px;
      font-weight: bold;
    }
  }
  .seachpagetop_right {
    margin: 10px 0;
    font-size: 14px;
    color: #7f667f;
  }
}
.seachpage_box {
  width: 100%;
  // padding: 0 15px;
  margin-bottom: 20px;
  .seachpage_prop {
    height: 35px;
    line-height: 35px;
    font-size: 15px;
    font-weight: bold;
    text-overflow: ellipsis;
    // padding: 16px;
    overflow: hidden;
    span {
      display: block;
    }
    .van-cell__right-icon {
      margin-top: 5px;
    }
  }
  .van-collapse-item__content {
    padding: 0 !important;
    height: auto !important;
  }
}
.seachlis {
  width: 100%;
  height: 80px;
  border-bottom: 1px #ccc solid;
  background: #f6f8f8;
  padding: 0 12px;
  .seachlis_top {
    width: 100%;
    padding: 10px 0;
    display: flex;
    height: 20px;
    line-height: 20px;
    color: #000;
    .seachlistop_left {
      width: 20%;
      height: 20px;
      font-size: 16px;
      margin-right: 10px;
    }
    .seachilstop_right {
      width: 70%;
      height: 20px;
      font-size: 16px;
      font-weight: 550;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .seachlis_bot {
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-left: 30%;
    .seachlisbot_tiem {
      margin-top: 20px;
      font-size: 15px;
    }
    & div:nth-child(2) {
      margin-top: 20px;
      // color: white;
    }
  }
}
.seachpage_content {
  height: 100px;
}
</style>