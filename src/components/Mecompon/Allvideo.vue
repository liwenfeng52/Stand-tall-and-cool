<template>
  <div>
    <div class="allvideo_top"></div>
    <div class="allvideo_box">
      <div
        class="meboxs"
        v-for="item in videolis"
        :key="item.id"
        v-if="!isall"
        @click="clickvideo(item.id)"
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
      </div>
      <div class="allvideolog" v-if="isall">
        <van-loading type="spinner" color="#1989fa" />
      </div>
      <div class="isallshow" v-if="isname">
        <p>{{ isallname }}</p>
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
      isall: true,
      videolis: [],
      isallname: "请登录",
      isname: false,
    };
  },
  methods: {
    // 点击判断有没有权限
    clickvideo(e) {
      if (this.registe == "点击登录") {
        this.isallname = "请登录";
        this.isname = true;
        setTimeout(() => {
          this.isname = false;
        }, 1000);
      }
      if (this.registe == "登录成功") {
        if (this.my == "已成为会员") {
          this.$router.push({ name: "mdrvider", params: { id: e } });
        } else {
          this.isallname = "请领取会员";
          this.isname = true;
          setTimeout(() => {
            this.isname = false;
          }, 1000);
        }
      }
    },
  },
  created() {
    get("free")
      .then((data) => {
        if (data.data.code == 200) {
          data.data.result.forEach((item, index) => {
            if (index > 3) {
              this.videolis.push(item);
              setTimeout(() => {
                this.isall = false;
              }, 1000);
            }
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
    // console.log(this.videolis);
  },
  computed: {
    ...mapState(["registe", "my"]),
  },
};
</script>

<style lang="less">
.allvideo_box {
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
  }
  .allvideolog {
    position: absolute;
    top: 10px;
    left: 0;
    width: 100%;
    text-align: center;
  }
  .isallshow {
    position: fixed;
    top: 40%;
    left: 0;
    width: 100%;
    padding: 0px 20px;
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