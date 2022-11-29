<template>
  <div class="mdrvideo_box">
    <!-- 头部定位信息 -->
    <div class="mdrvideo_top">
      <!-- 图标 -->
      <van-nav-bar
        title="会员视频"
        left-text="返回"
        left-arrow
        @click-left="clickleft"
      />
      <!-- 视频 -->
      <div class="mdrvidertop_video" v-if="mdilis[inde]">
        <video :src="mdilis[inde].vieo" controls></video>
      </div>
    </div>
    <!-- 视频标题 -->
    <div class="mdrvider_bot" v-if="mdilis[inde]">
      <div class="mdrvider_name">{{ mdilis[inde].name }}</div>
      <div class="tiem">
        <div>{{ mdilis[inde].num }}</div>
        <div>{{ mdilis[inde].data }}</div>
      </div>
      <div class="mdr_img">
        <div>{{ mdilis[inde].span }}</div>
        <div v-if="mdilis[inde].spans == ''">{{ mdilis[inde].spans }}</div>
        <div class="bi-arrow-down-circle-fill tubiao" @click="downvideo(mdilis[inde].id)"></div>
      </div>
    </div>
    <!-- 分割线 -->
    <div class="mdcross"></div>
    <!-- 标题组件 -->
    <mefree :frname="mdilis[inde].span" v-if="mdilis[inde]"></mefree>
    <!--  -->
    <div class="mdvideo_tab">
      <!-- 跑马灯 -->
      <van-swipe
        :loop="false"
        :width="150"
        :touchable="true"
        :initial-swipe="inde"
      >
        <!--  -->
        <van-swipe-item
          v-for="item in mdilis"
          :key="item.id"
          @click="mdclick(item.id)"
        >
          <img :src="item.img" alt="" />
          <p :class="{ active: item.id - 1 == inde }">{{ item.name }}</p>
          <p>{{ item.tiem }}</p>
        </van-swipe-item>
        <!--  -->
      </van-swipe>
    </div>
  </div>
</template>

<script>
import Mefree from "../components/Mecompon/Mefree.vue";
import { get } from "../axios/index";
import { mapState } from "vuex";
export default {
  data() {
    return {
      mdname: "Al设计",
      inde: 1,
      mdilis: [],
      setTiem: 0,
      item: 0,
    };
  },
  created() {
    // 时间
    if (this.vuextiem == 0) {
      let tiem = localStorage.getItem("tiem");
      this.$store.commit("settiem", tiem - 0);
    }
    //
    let index = this.$route.params.id;
    if (index != undefined) {
      localStorage.setItem("video", index);
    }
    index = localStorage.getItem("video");
    this.inde = index - 1;

    get("free").then((data) => {
      data.data.result.forEach((item, index) => {
        let obj = {};
        let spit = item.span.split("#");
        obj.name = item.name;
        obj.data = item.data;
        obj.id = item.id;
        obj.span = spit[1];
        obj.spans = spit[2];
        obj.num = item.num;
        obj.tiem = item.tiem;
        obj.vieo = item.vieo;
        obj.img = item.img;
        this.mdilis.push(obj);
      });
    });
    // console.log(this.mdilis);
    // 开启定时器
    this.item = this.vuextiem;
    this.setTiem = setInterval(() => {
      this.item++;
    }, 1000);
  },
  computed: {
    ...mapState(["vuextiem","vxdowmvideo"]),
  },
  methods: {
    clickleft() {
      this.$router.push({ name: "memder" });
    },
    mdclick(e) {
      // console.log(e);
      this.inde = e - 1;
    },
    downvideo(e){
      this.$dialog.confirm({
        title:"已加入到下载菜单",
        message:"是否要进入下载管理"
      }).then(()=>{
        this.$router.push({name:"filter"})
      }).catch(()=>{
      })
      this.$store.commit("vxdowmvideo",e)
      // console.log(this.vxdowmvideo)
    //  设置本地
      let obj=[]
      let get=JSON.parse( localStorage.getItem("downvider"))
      if(get){
        obj=[...new Set(get)]
        obj.push(e)
        obj=[...new Set(obj)]
        for (let i=0;i<obj.length;i++){
          this.$store.commit("vxdowmvideo",obj[i])
        }
        localStorage.setItem("downvider",JSON.stringify(obj))
        // console.log(this.vxdowmvideo)
      }else {
          obj.push(e)
          localStorage.setItem("downvider",JSON.stringify(obj))
      }
    }
  },
  components: {
    Mefree,
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "memder") {
      clearInterval(this.item);
      localStorage.setItem("tiem", this.item);
      // console.log("时间", this.item);
      next();
    }else if(to.name=="filter"){
      clearInterval(this.item);
      localStorage.setItem("tiem", this.item);
      // console.log("时间", this.item);
      next();
    }
    // console.log(to,"to");
  },
};
</script>

<style lang="less">
.mdrvideo_box {
  width: 100%;
  .mdrvideo_top {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 1000;
    .van-nav-bar {
      background-image: linear-gradient(
        to top,
        #f4de92 30%,
        #56bac6,
        #47b6ba,
        #4a8dfa
      );
    }
    .mdrvidertop_licon {
      position: absolute;
      top: 0;
      left: 0;
      padding: 10px 16px;
      font-size: 19px;
    }
    .mdrvidertop_video {
      width: 100%;
      video {
        width: 100%;
        height: 221px;
      }
    }
  }
  .mdrvider_bot {
    width: 100%;
    padding: 10px 15px;
    margin-top: 267px;
    .mdrvider_name {
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-weight: bold;
      font-size: 16px;
    }
    .tiem {
      display: flex;
      font-size: 12px;
      color: #ccc;
      opacity: 0.9;
      margin-top: 8px;
      & div:nth-child(1) {
        margin-right: 9px;
      }
    }
    .mdr_img {
      position: relative;
      display: flex;
      width: 100%;
      font-size: 11px;
      margin-top: 8px;
      & div {
        padding: 5px;
        background-color: #ccc;
        opacity: 0.8;
      }
      & div:nth-child(2) {
        margin-left: 10px;
      }
     .tubiao{
        position: absolute;
        right: 10px;
        top: 0;
       background: none !important;
       font-size: 20px;
       padding: 2px 0 0 0 !important;

      }
    }
  }
  .mdcross {
    width: 100%;
    height: 5px;
    background-color: #ccc;
    opacity: 0.2;
  }
  .mefreetop_right {
    font-size: 14px;
  }
  .mdvideo_tab {
    width: 100%;
    overflow: hidden;
    .van-swipe {
      //   width: 200%;
      .van-swipe-item {
        width: 140px;
        position: relative;
        flex-shrink: 0;
        padding: 5px;
        img {
          height: 90px;
          width: 100%;
          background-size: cover;
        }
        & p:nth-child(2) {
          font-size: 16px;
          font-weight: bold;
          width: 140px;
          overflow: hidden !important;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        & p:nth-child(3) {
          position: absolute;
          bottom: 34px;
          right: 6px;
          font-size: 13px;
          padding: 2px;
          background: #ccc;
          opacity: 0.9;
        }
      }
      .active {
        color: turquoise;
      }
      .van-swipe__indicators {
        display: none;
      }
    }
  }
}
</style>