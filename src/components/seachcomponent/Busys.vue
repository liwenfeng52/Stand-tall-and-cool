<template>
  <div>
    <div class="busystyle"></div>
    <div class="busy_top">
      <p></p>
      <p>往期评论</p>
    </div>
    <div class="busy_content">
      <img src="http://127.0.0.1:3000/static/imgs/busys.jpg" alt="" />
      <span>还没有同学评价哦～</span>
    </div>
    <div class="busys_bot"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.busystyle {
  width: 100%;
  height: 10px;
  background: #f6f8f8;
}
.busy_top {
  margin-top: 15px;
  width: 100%;
  padding: 0 15px;
  display: flex;
  height: 20px;
  line-height: 20px;
  //   margin-bottom: 100px;
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
.busy_content {
  width: 100%;
  padding: 10px;
  height: 200px;

  img {
    margin-left: 45px;
    height: 144px;
    width: 241px;
    background-size: 100% 100%;
  }
  span {
    display: block;
    width: 100%;
    color: rgb(102, 102, 102);
    text-align: center;
    margin-bottom: 80px;
  }
}
.busys_bot {
  margin-bottom: 150px;
}
</style>