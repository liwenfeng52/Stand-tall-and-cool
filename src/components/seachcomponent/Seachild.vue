<template>
  <div>
    <div class="seachild">
      <!-- 课前须知 -->
      <div class="seachild_top">
        <div class="schildtop_top">
          <p>课前须知</p>
          <van-icon name="play" size="18" style="margin-top: 2.5px" />
        </div>
      </div>
      <!-- 下面买前 -->
      <div class="seachild_bott">
        <div class="schildbott_top">
          <div class="schilbt_left">微信号:无敌派大星</div>
          <div class="schilbt_right">
            <img src="http://127.0.0.1:3000/static/imgs/wx.jpg" alt="" />
          </div>
        </div>
        <div class="schildbott_bo">
          <div>
            <p>【双11优惠】</p>
            <span>满500减20,限时1年</span>
          </div>
          <div>
            <p>【提前辅导】</p>
            <span>提前解锁社会第一课</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.seachild {
  margin-top: 15px;
  width: 100%;
  padding: 0 15px;
  .seachild_top {
    width: 100%;
    .schildtop_top {
      padding: 5px 5px 5px 10px;
      width: 30%;
      display: flex;
      color: white;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      background-image: linear-gradient(to right, #ed9c3f, #f3bd4e);
    }
  }
  .seachild_bott {
    width: 100%;
    padding: 10px;
    // overflow: hidden;
    box-shadow: 0px 0px 10px #ccc;
    border-right: 10px;
    margin-bottom: 50px;
    .schildbott_top {
      width: 100%;
      display: flex;
      padding: 10px;
      justify-content: space-between;
      background: #f5f6f6;
      .schilbt_left {
        width: 50%;
        line-height: 150px;
        font-size: 14px;
        color: #7b7b7b;
      }
      .schilbt_right {
        width: 50%;
        height: 150px;
        img {
          height: 150px;
          width: 100%;
          background-size: 100% 100%;
        }
      }
    }
    .schildbott_bo {
      width: 100%;
      & div:nth-child(1) {
        margin-top: 20px;
      }
      & div:nth-child(2) {
        margin-top: 10px;
      }
      div {
        width: 100%;
        p {
          display: inline-block;
          color: #f39893;
        }
        span {
          font-size: 13px;
          color: #6c6c6c;
        }
      }
    }
  }
}
</style>