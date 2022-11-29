<template>
  <div>
    <div class="culum">
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item
          :title="item.data"
          :name="item.id"
          v-for="item in culumlis[0]"
          :key="item.id"
        >
          <div
            class="culum_box"
            v-for="culm in item.keylis"
            :key="culm.id"
            @click="pacevideo(culm.vido, culm.name)"
          >
            <div class="culumbox_left">
              <div class="culmleft_top">
                <p>
                  第<span>{{ culm.id }}</span
                  >{{ culm.name }}
                </p>
              </div>
              <div class="culmlkeft_bot">
                <span>直播时间:</span>
                <p>{{ culm.tiem }}</p>
              </div>
            </div>
            <div class="culumbox_right">免费试学</div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import { get } from "../../axios";
export default {
  props: ["culmchild"],
  data() {
    return {
      activeName: "",
      culumlis: [],
      culmvieo: "",
    };
  },
  created() {
    get("vieo").then((data) => {
      data.data.result.forEach((item, index) => {
        if (item.id == this.culmchild) {
          // console.log(item);
          let obj = item.children;
          this.culumlis.push(obj);
        }
      });
    });
  },
  methods: {
    zhiparent() {
      // console.log(this.culumlis);
    },
    pacevideo(e, i) {
      this.$emit("nameculm", i);
      this.$emit("culmvieo", e);
    },
  },
};
</script>

<style lang="less">
.culum {
  width: 100%;
  .van-tabs__content {
    margin-top: 0 !important;
  }
  .culum_box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .culumbox_left {
      width: 70%;
      .culmleft_top {
        width: 100%;
        p {
          width: 100%;
          color: #000;
          font-size: 13px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      .culmlkeft_bot {
        width: 100%;
        display: flex;
        margin-top: 5px;
      }
    }
    .culumbox_right {
      width: 30%;
      height: 100%;
      line-height: 45px;
      text-align: center;
    }
  }
}
</style>