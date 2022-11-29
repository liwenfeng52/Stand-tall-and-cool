<template>
  <div>
    <div class="mebox_top">
      <div
        class="meboxs"
        v-if="!ismelog"
        v-for="item in melis"
        :key="item.id"
        @click="meboxclick(item.id)"
      >
        <div class="meimg">
          <img :src="item.img" alt="" />
        </div>
        <div class="mename">
          <p>{{ item.name }}</p>
          <p>{{ item.span }}</p>
        </div>
        <!-- 时间 -->
        <div class="tiem">{{ item.tiem }}</div>
        <div class="mexian">限免</div>
      </div>
      <!-- 加载标签 -->
      <div class="melosg" v-if="ismelog">
        <van-loading type="spinner" color="#E7C593" />
      </div>
      <!-- 弹出框 -->
      <div class="ismebox" v-if="isbox">
        <p>{{ boxname }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "../../axios";
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      ismelog: true,
      melis: [],
      isbox: false,
      boxname: "成为会员",
    };
  },
  computed: {
    ...mapState(["registe", "my"]),
  },
  methods: {
    meboxclick(e) {
      if (this.registe == "点击登录") {
        this.boxname = "请登录";
        this.isbox = true;
        setTimeout(() => {
          this.isbox = false;
        }, 1000);
      } else if (this.registe == "登录成功") {
        if (this.my == "已成为会员") {
          this.$router.push({ name: "mdrvider", params: { id: e } });
        } else {
          this.boxname = "请获取会员";
          this.isbox = true;
          setTimeout(() => {
            this.isbox = false;
          }, 1000);
        }
      }
    },
  },
  created() {
    get("free").then((data) => {
      if (data.data.code == 200) {
        data.data.result.forEach((item, index) => {
          if (index <= 3) {
            this.melis.push(item);
            setTimeout(() => {
              this.ismelog = false;
            }, 1000);
          }
        });
      }
    });
    // console.log(this.melis);
  },
};
</script>

<style lang="less">
.mebox_top {
  margin-top: 5px;
  position: relative;
  width: 100%;
  padding: 0 5px;
  display: flex;
  flex-wrap: wrap;
  .meboxs {
    position: relative;
    width: 50%;
    padding: 0 10px;
    margin-bottom: 10px;
    .meimg {
      width: 100%;
      height: 90px;
      img {
        height: 90px;
        width: 100%;
        background-size: cover;
      }
    }
    .mename {
      width: 100%;
      overflow: hidden;
      & p:nth-child(1) {
        width: 100%;
        margin-top: 5px;
        margin-bottom: 6px;
        font-size: 14px;
        font-weight: bold;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      & p:nth-child(2) {
        font-size: 10px;
        color: #9999b3;
      }
    }
    .tiem {
      position: absolute;
      top: 69px;
      right: 14px;
      font-size: 8px;
      padding: 3px;
      background-color: #ccc;
      opacity: 0.5;
    }
    .mexian {
      position: absolute;
      top: 0px;
      left: 10px;
      padding: 4px;
      background-color: red;
      font-size: 8px;
      color: white;
      font-weight: 550;
    }
  }
  .melosg {
    position: absolute;
    left: 0;
    top: 0px;
    width: 100%;
    text-align: center;
  }
  .ismebox {
    position: fixed;
    top: 40%;
    left: 0;
    width: 100%;
    padding: 0px 20px;
    z-index: 1000000;
    p {
      color: red;
      height: 80px;
      width: 100%;
      border-radius: 25px;
      box-shadow: 0 0 6px red;
      line-height: 80px;
      text-align: center;
      background: #ccc;
    }
  }
}
</style>