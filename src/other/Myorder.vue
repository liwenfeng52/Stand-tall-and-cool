<template>
  <div>
    <div class="myorder_box">
      <div class="myorder_top">
        <van-nav-bar
          title="订单信息"
          left-text="返回"
          left-arrow
          fixed
          @click-left="onClickLeft"
        />
      </div>
      <!-- 地址位置 -->
      <!-- <div class="order_box"></div> -->
      <!-- 订单盒子 -->
      <div class="order">
        <!-- 第一循环盒子 -->
        <div class="order_box" v-for="item in myorderlis" :key="item.id">
          <!-- 循环 -->
          <div class="order_head">
            <!-- 标题 -->
            <div class="order_name">
              <div class="ordername_left">
                小海绵书店<van-icon name="arrow" />
              </div>
              <div class="ordername_right">下单成功,等卖家发货</div>
            </div>
            <!-- 商品信息 -->
            <div class="order_mess" v-for="(ite, inde) in item" :key="inde">
              <div class="order_img">
                <img :src="ite.img" alt="" />
              </div>
              <div class="oredermess_name">
                <p>{{ ite.name }}</p>
              </div>
            </div>
            <!--  -->
            <div class="pace"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//
import { mapState, mapGetters } from "vuex";
import { get } from "../axios";
export default {
  data() {
    return {
      myorderlis: [],
    };
  },
  created() {
    get("course").then((data) => {
      data.data.result.forEach((item, index) => {
        // for (let i = 0; i < this.vxorder.length; i++) {
        //   if (item.id == this.vxorder[i]) {
        //     this.myorderlis.push(item);
        //   }
        // }
        // 第二方法
        // console.log(index);
        let obj = [];
        for (let i = 0; i < this.vxorder.length; i++) {
          let arr = [];
          for (let j = 0; j < this.vxorder[i].length; j++) {
            let ren = [];
            if (item.id == this.vxorder[i][j]) {
              ren.push(item);
            }
            if (ren.length != 0) {
              arr.push(ren[0]);
            }
          }
          if (i == i && arr.length != 0) {
            obj.push(arr[0]);
          }
        }
        if (obj.length != 0) {
          this.myorderlis.push(obj);
          //   console.log(obj);
        }
      });
    });
    //
    if (this.vxorder.length == 0) {
      let obj = localStorage.getItem("vxorder");
      this.$store.commit("setvxorder", obj);
    }

    // console.log(this.myorderlis);
  },
  computed: {
    ...mapState(["vxorder"]),
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    orderfor(e) {
      // for(let i=0;i<this.vxorder.length;i++){
      //    for(let j=0;j<this.vxorder[i].length;j++){
      //        if(this.vxorder[i][j]==e)
      //    }
      // }
    },
  },
};
</script>

<style lang="less">
.myorder_box {
  width: 100%;
  .order {
    width: 100%;
    padding: 0 5px;
    margin-top: 56px;
    .order_box {
      width: 100%;
      padding: 5px 10px;
      background: #ccc;
      border-radius: 10px;
      margin-bottom: 10px;
      //   margin-top: 10px;
      .order_head {
        width: 100%;
        .order_name {
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          width: 100%;
          .ordername_left {
            font-size: 15px;
            font-weight: bold;
            // margin-right: 5px;
          }
          .ordername_right {
            font-size: 13px;
            color: red;
          }
        }
        // 信息
        .order_mess {
          width: 100%;
          display: flex;
          border-bottom: 1px solid white;
          padding: 0px 0px 10px 0;
          margin-bottom: 6px;
          .order_img {
            width: 35%;
            height: 90px;
            img {
              height: 100%;
              width: 100%;
              background-size: cover;
              border-radius: 10px;
            }
          }
          .oredermess_name {
            width: 65%;
            height: 90px;
            // padding-left: 10px;
            padding: 0px 0px 10px 0px;

            p {
              width: 100%;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              font-size: 15px;
              font-weight: bold;
            }
          }
        }
        .pace {
          width: 100%;
          text-align: right;
          padding-right: 10px;
          font-size: 16px;
          color: red;
          font-weight: bold;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>