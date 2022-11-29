<template>
  <div>
    <div class="homefiree">
      <div class="homefiree_leader">
        <div class="homeleader_left bi-chevron-left" @click="pushome"></div>
        <div class="homeleader_right bi-grip-vertical"></div>
      </div>
      <div class="homefiree_vido">
        <video :src="palyvi" controls v-if="!islog"></video>
        <div class="positi_home" v-if="islog"><p>还没开播</p></div>
      </div>
      <!-- 标题 -->
      <div class="homefiree_name">
        <div class="homefireename_top" v-if="parentlis">
          {{ parentlis }}
        </div>
        <div class="homefireename_bot">
          <p>{{ shu }}人学过</p>
          <p>课程详细<van-icon name="arrow" /></p>
        </div>
      </div>
      <div class="wrie_firee"></div>
      <div class="homefiree_tab">
        <van-tabs>
          <van-tab title="课程目录">
            <culum
              @culmvieo="playvideo"
              :culmchild="child"
              @nameculm="nametiem"
            ></culum>
          </van-tab>
          <van-tab title="作业讨论"></van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Culum from "../components/Homefiree/Culum.vue";
import { get } from "../axios/index";
import { mapState } from "vuex";
export default {
  data() {
    return {
      palyvi: "",
      islog: true,
      child: "",
      parentlis: "",
      shu: "",
      cumltiem: null,
      tiem: 0,
    };
  },
  created() {
    let ren = Math.floor(Math.random() * 500 + 10);
    this.shu = ren;
    this.child = this.$route.params.id;
    if (this.child != undefined) {
      localStorage.setItem("firee", this.child);
    }
    let index = localStorage.getItem("firee");
    this.child = index;
    get("vieo").then((data) => {
      data.data.result.forEach((item, index) => {
        if (item.id == this.child) {
          let obj = item.children[0].data;
          this.parentlis = obj;
        }
      });
    });
  },
  methods: {
    pushome() {
      this.$router.push({ name: "home" });
    },
    nametiem(e) {
      this.parentlis = e;
    },
    playvideo(e) {
      this.palyvi = e;
      this.islog = false;
      this.tiem = this.vuextiem;
      this.cumltiem = setInterval(() => {
        this.tiem += 1;
      }, 1000);
    },
  },
  computed: {
    ...mapState(["vuextiem"]),
  },
  components: {
    Culum,
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.cumltiem);
    this.$store.commit("settiem", this.tiem);
    next();
  },
};
</script>

<style lang="less">
.homefiree {
  width: 100%;
  position: relative;
  .homefiree_leader {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 10px 15px 0px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10;
    div {
      font-size: 19px;
      color: #ccc;
    }
  }
  .homefiree_vido {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 250px;
    background-color: #000;
    z-index: 1;
    video {
      height: 100%;
      width: 100%;
    }
    .positi_home {
      position: absolute;
      top: 100px;
      left: 0;
      width: 100%;
      color: white;
      text-align: center;
      padding: 0 100px;
      p {
        width: 100%;
        text-align: center;
        background-color: turquoise;
        font-size: 14px;
      }
    }
  }
  .homefiree_name {
    margin-top: 260px;
    width: 100%;
    padding: 0px 15px;
    .homefireename_top {
      //   margin-top: 10px;
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 17px;
      font-weight: bold;
    }
    .homefireename_bot {
      width: 100%;
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #ccc;
      opacity: 0.7;
    }
  }
  .wrie_firee {
    width: 100%;
    height: 6px;
    background-color: #ccc;
    opacity: 0.5;
  }
  .homefiree_tab {
    width: 100%;
    .van-tab__pane {
      margin-top: 0 !important;
    }
  }
}
</style>