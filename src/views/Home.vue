<template>
  <div>
    <div class="home_top" v-if="!isass">
      <div class="hometop_left">
        <form action="/">
          <van-search
            v-model="value"
            :show-action="false"
            placeholder="搜索课程和老师"
            @focus="seafocus"
            shape="round"
          />
        </form>
      </div>
      <div class="hometop_right">
        <van-icon name="back-top" :dot="homedot" size="23px" @click="clickdown"/>
      </div>
    </div>
    <!-- 搜索宽结束 -->
    <!-- tab开始 -->
    <div class="tabhome">
      <van-tabs line-width="20px" color="#4FC08D">
        <van-tab
          v-for="index in hometab"
          :title="index.name"
          :key="index.id"
          @click="tabclick(index.id)"
          lazy-render
        >
          <div v-if="index.id == 1">
            <!-- 轮播图 -->
            <Steps />
            <!--免费直播 -->
            <direct class="directstyle"></direct>
            <!-- 最新课程 -->
            <newset class="newsetstyle"></newset>
            <!-- 全部信息 -->
            <allcoures class="allstyle" :allindex="index.id"></allcoures>
          </div>
          <div v-if="index.id == 2">
            <direct class="directstyle"></direct>
            <allcoures class="allstyle" :allindex="index.id"></allcoures>
          </div>
          <div v-if="index.id == 3">
            <direct class="directstyle"></direct>
            <allcoures class="allstyle" :allindex="index.id"></allcoures>
          </div>
          <div v-if="index.id == 4">
            <direct class="directstyle"></direct>
            <allcoures class="allstyle" :allindex="index.id"></allcoures>
          </div>
          <div v-if="index.id == 5">
            <direct class="directstyle"></direct>
            <allcoures class="allstyle" :allindex="index.id"></allcoures>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- tab结束 -->
  </div>
</template> 

<script>
import Mederchild from "@/components/Homecomponent/Mederchild.vue";
import Steps from "@/components/Homecomponent/Steps.vue";
import Direct from "@/components/Homecomponent/Direct.vue";
import Newset from "@/components/Homecomponent/Newset.vue";
import Allcoures from "@/components/commonality/Allcoures.vue";
export default {
  name: "name",
  data() {
    return {
      active: 2,
      value: "",
      isass: false,
      homedot: false,
      hometab: [
        {
          id: 1,
          name: "推荐",
        },
        {
          id: 2,
          name: "平面",
        },
        {
          id: 3,
          name: "绘画",
        },
        {
          id: 4,
          name: "电商",
        },
        {
          id: 5,
          name: "Ul",
        },
      ],
      numindex: 1,
    };
  },
  methods: {
    homeshow(e) {
      this.isass = e;
    },
    seafocus() {
      // this.isass = true;
    },
    tabclick(e) {
      // console.log(e);
    },
    clickdown(){
      this.$router.push({name:"filter"})
    }
  },
  components: {
    Mederchild,
    Steps,
    Direct,
    Newset,
    Allcoures,
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
  },
};
</script>

<style lang="less">
.newsetstyle {
  // margin-bottom: 150px;
}
.allstyle {
  margin-top: 15px;
  margin-bottom: 100px;
}
.home_top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 12px;
  display: flex;
  z-index: 1000;
  background-color: white;
}
.hometop_left {
  width: 90%;
}
.van-search {
  padding: 0 !important;
  margin: 0 !important;
}
.hometop_right {
  width: 10%;
  text-align: center;
  line-height: 0px;
  transform: rotateZ(180deg) translateY(5px);
}
.directstyle {
  margin-bottom: 10px;
}
/* .meder {
  position: fixed;
} */
/* tab */
.tabhome {
  width: 100%;
  padding: 0 12px;
  margin-top: 56px;
  .van-tabs__wrap {
    position: fixed;
    top: 57px;
    width: 100%;
    // background-color: red;
    z-index: 100000;
    height: 33px !important;
  }
}
.van-tab__pane {
  margin-top: 96px;
}
</style>