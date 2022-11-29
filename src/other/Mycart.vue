<template>
  <div>
    <!-- 标题 -->
    <div class="mycart_top">
      <van-nav-bar
        title="购物车"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        fixed
      />
    </div>
    <!-- 购物车 -->
    <div class="mycart">
      <!-- 盒子 (循环盒子)-->
      <div class="mycart_box">
        <!-- 商品模块 -->
        <div class="macartbox" v-for="item in mycartlis" :key="item.id">
          <div
            class="mycart_left"
            @touchstart="mystart"
            @touchmove="mymove"
            @touchend="myend"
          >
            <!-- 商品图片left -->
            <div class="my_img">
              <!-- 有没有勾 -->
              <div class="input">
                <p>
                  <input
                    type="checkbox"
                    v-model="item.mon"
                    @click="updatashong(item.mon, item.id)"
                  />
                </p>
              </div>
              <!-- 图片 -->
              <div class="myimg_img">
                <img :src="item.img" alt="" />
              </div>
            </div>
            <!-- 商品图片结束 -->
            <div class="my_name">
              <div class="myname">{{ item.deta }}</div>
              <div class="myprgin">${{ item.money }}</div>
            </div>
          </div>
          <!-- 删除模块 -->
          <div class="mycart_right" @click="clickremove(item.id)">删除</div>
        </div>
      </div>
    </div>
    <!-- 结算 -->
    <div class="my_settle">
      <div class="mysettle_left">
        <p>
          <input type="checkbox" v-model="checked" @click="onSubmit(checked)" />
        </p>
        <p>合计</p>
      </div>
      <!--  -->
      <div class="mysettle_right">
        <p>
          结算:<span>￥{{ pace }}</span>
        </p>
        <p @click="mysubmit">提交订单</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { mapState } from "vuex";
import { get } from "../axios";
export default {
  data() {
    return {
      // 点击商品时第一个位置
      start: "",
      // 开关时为了阻止二次触发
      isart: false,
      // 用来遍历
      mycartlis: [],
      // 钱综合
      pace: 0,
      //
      indexpace: [],
      checked: false,
      // 获取删除前indexpace的长度
      index: 0,
    };
  },
  watch: {
    mycartlis: {
      deep: true,
      handler(a, b) {
        let index = this.mycartlis.length;
        // 判断有没有全部勾选
        let pace = 0;
        // 获取勾选monq钱
        let he = 0;
        //删除一个变
        if (index < this.index) {
          for (let j = 0; j < this.mycartlis.length; j++) {
            if (this.mycartlis[j].mon) {
              pace += 1;
              he += this.mycartlis[j].money;
              if (pace == index) {
                this.checked = true;
              } else {
                this.checked = false;
              }
            }
          }
          this.pace = he;
          this.index = index;
        } else {
          //是判断
          for (let i = 0; i < this.mycartlis.length; i++) {
            if (this.mycartlis[i].mon) {
              pace += 1;
              if (pace == index) {
                this.checked = true;
              } else {
                this.checked = false;
              }
            }
          }
        }
      },
    },
  },
  created() {
    let menoney = localStorage.getItem("menoney");
    if (this.vxmemoney == 0) {
      this.$store.commit("setmoney", menoney);
    }
    let gift = JSON.parse(localStorage.getItem("gift"));
    if (gift) {
      gift = new Set(gift);
      let lis = [...gift];
      for (let i = 0; i < lis.length; i++) {
        this.$store.commit("setgift", lis[i]);
      }
    }
    get("course").then((data) => {
      data.data.result.forEach((item, index) => {
        // console.log(index);
        for (let i = 0; i < this.gift.length; i++) {
          if (item.id == this.gift[i]) {
            // console.log(index);
            this.index += 1;
            let obj = {};
            obj.deta = item.deta;
            obj.mon = false;
            obj.img = item.img;
            obj.id = item.id;
            obj.money = Number(item.num);
            this.mycartlis.push(obj);
            // console.log(this.indexpace);
          }
        }
      });
    });
  },
  methods: {
    mystart(e) {
      this.start = e.changedTouches[0].pageX;
      this.isart = true;
      //   console.log(e.changedTouches.pageX);
      //   console.log(e.target);
    },
    mymove(e) {
      if (this.isart) {
        // console.log(e.target.parentElement);
        if (e.target.parentElement.className == "mycart_left") {
          let index = e.changedTouches[0].pageX;
          let item = this.start - index;
          if (item > 50) {
            e.target.parentElement.style.marginLeft = "-20%";
            e.target.parentElement.style.transition = "all 0.5s";
          } else {
            e.target.parentElement.style.marginLeft = "0px";
          }
        }
      }
    },
    myend() {
      this.isart = false;
    },
    // 删除按钮
    clickremove(e) {
      for (let i = 0; i < this.mycartlis.length; i++) {
        if (e == this.mycartlis[i].id) {
          this.mycartlis.splice(i, 1);
          this.$store.commit("cartsetgift", e);
          // console.log(this.gift);
          if (this.gift.length == 0) {
            localStorage.removeItem("gift");
            this.checked = false;
            // localStorage.clear("gift");
          } else {
            localStorage.setItem("gift", JSON.stringify(this.gift));
          }
        }
      }
    },
    // 点击算出总价
    updatashong(e, inde) {
      let key = !e;
      if (key) {
        for (let i = 0; i < this.mycartlis.length; i++) {
          if (this.mycartlis[i].id == inde) {
            this.pace += this.mycartlis[i].money;
          }
        }
      } else {
        for (let i = 0; i < this.mycartlis.length; i++) {
          if (this.mycartlis[i].id == inde) {
            this.pace -= this.mycartlis[i].money;
          }
        }
      }
    },
    // 点击合计
    onSubmit(e) {
      let key = !e;
      let pace = 0;
      if (key) {
        for (let i = 0; i < this.mycartlis.length; i++) {
          this.mycartlis[i].mon = true;
          pace += this.mycartlis[i].money;
        }
      } else {
        for (let i = 0; i < this.mycartlis.length; i++) {
          this.mycartlis[i].mon = false;
        }
      }
      this.pace = pace;
    },
    onClickLeft() {
      this.$router.push({ name: "my" });
    },
    // 结束清单
    mysubmit() {
      // 判断是否超过钱包值
      let index = null;
      // console.log(index);
      for (let i = 0; i < this.mycartlis.length; i++) {
        if (this.mycartlis[i].mon) {
          index += 1;
        }
      }
      console.log(index);
      if (index == null) {
        this.$dialog.alert({
          title: "请勾选商品",
        });
      } else {
        if (this.pace > this.vxmemoney) {
          Dialog.confirm({
            title: "余额不足",
            message: "请去钱包充值",
          }).then(() => {
            this.$router.push({ name: "mymoney" });
          });
        } else if (this.mycartlis.length == 0) {
          this.$dialog.alert({
            title: "还未有商品",
          });
        } else {
          Dialog.alert({
            title: "购买成功",
            message: "去订单页面查看",
          }).then(() => {
            let arr = [];
            for (let i = 0; i < this.mycartlis.length; i++) {
              if (this.mycartlis[i].mon) {
                arr.push(this.mycartlis[i].id);
              }
            }
            this.$store.commit("setvxorder", arr);
            this.$store.commit("mycart", this.pace);
            this.$router.push({ name: "myorder" });
            localStorage.setItem("vxorder", JSON.stringify(arr));
          });
        }
      }
    },
  },
  computed: {
    ...mapState(["gift", "vxmemoney", "vxorder"]),
  },
};
</script>

<style lang="less">
.mycart_top {
  z-index: 100000000;
  width: 100%;
  background-color: white;
  .van-nav-bar__content {
    background-color: white;
  }
}
.mycart {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;

  // opacity: 0.7;
  .mycart_box {
    width: 100%;
    transition: all 1s;
    overflow: hidden;
    margin-top: 49px;
    background-color: white;
    padding-bottom: 60px;
    &:last-child {
      margin-bottom: 100px;
    }
    & div:nth-child(1) {
      margin-top: 0;
    }
    .macartbox {
      background-color: white;
      margin-top: 10px;
      width: 100%;
      display: flex;
      // box-shadow: 0px 0px 10px #ccc;
      border-radius: 10px;
      background: #ccc;
      opacity: 0.85;
      .mycart_left {
        flex-shrink: 0;
        width: 100%;
        height: 100px;
        display: flex;
        //   background: #ccc;
        //   left
        .my_img {
          display: flex;
          position: relative;
          width: 45%;
          overflow: hidden;
          .input {
            width: 20%;
            position: relative;
            p {
              position: absolute;
              top: 40%;
              left: 5px;
              width: 20px;
              height: 20px;
              border: 1px red solid;
              border-radius: 50%;
              overflow: hidden;
              input {
                position: relative;
                right: 0.6px;
                top: -0.9px;
                width: 20px;
                height: 20px;
                border: none !important;
              }
            }
          }
          .myimg_img {
            width: 80%;
            overflow: hidden;
            padding: 10px;
            height: 100px;
            img {
              width: 100%;
              height: 100%;
              background-size: cover;
              border-radius: 5px;
            }
          }
        }
        .my_name {
          width: 55%;
          padding: 5px;
          position: relative;
          .myname {
            width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          .myprgin {
            position: absolute;
            bottom: 10px;
            font-size: 16px;
            font-weight: bold;
            color: red;
            right: 21px;
          }
        }
      }
      .mycart_right {
        flex-shrink: 0;
        text-align: center;
        width: 20%;
        line-height: 100px;
        background: red;
      }
    }
  }
}
.my_settle {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 55px;
  background: #ffffff;
  box-shadow: 0 0 5px #ccc;
  z-index: 1000;
  display: flex;
  padding: 10px;
  .mysettle_left {
    width: 30%;
    display: flex;
    line-height: 40px;
    height: 40px;
    & p:nth-child(1) {
      position: relative;
      margin-top: 10px;
      height: 20px;
      width: 20px;
      border: 1px red solid;
      border-radius: 50%;
      overflow: hidden;
      input {
        position: absolute;
        top: -1px;
        left: -1px;
        width: 20px;
        height: 20px;
      }
    }
    & p:nth-child(2) {
      margin-left: 10px;
    }
  }
  .mysettle_right {
    width: 70%;
    height: 40px;
    line-height: 40px;
    display: flex;
    & p:nth-child(1) {
      width: 50%;
      text-align: right;
      padding-right: 5px;
      font-size: 14px;
      span {
        // display: block;
        font-size: 17px;
        color: red;
      }
    }
    & p:nth-child(2) {
      width: 50%;
      text-align: center;
      background-image: linear-gradient(to right, #fc4e31, #f7382d, #f21f28);
      border-radius: 25px;
    }
  }
}
</style>