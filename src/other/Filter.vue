<template>
  <div>
    <div class="filter_box">
      <div class="filter_top">
        <van-nav-bar
           title="下载管理"
           left-arrow
           fixed
           @click-left="onClickLeft"
            />
      </div>
<!--      内容-->
      <div class="filter_bot">
        <!--        下载中-->
        <div class="filterbot_top">
          <div class="dowan"><p>下载</p></div>
          <div class="filter_dowan">
             <div class="filterdowan_box" v-for="item in filterlis" :key="item.id">
                <div class="img">
                  <img :src="item.img">
                </div>
                <div class="filter_name">
                  <p>{{item.name}}</p>
                  <div class="bi bi-arrow-down-circle-fill" @click="getVideoArrayBuffer(item.vieo,item.name)"></div>
                  <div class="videremove bi bi-trash3" @click="viderome(item.id)"></div>
                </div>
             </div>
          </div>
        </div>
<!--    下载完成-->
<!--        <div class="filterbot_bot">-->
<!--           <div><p>已下载</p></div>-->
<!--          <div class="filter_yi">-->

<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "../axios/index"
// import axios from "axios";
import {mapState} from "vuex";
export default {
  data(){
    return{
       filterlis:[

       ],
      get:[]
    }
  },
  methods:{
    //跳转到my页面
    onClickLeft(){
      // console.log("1")
      // this.$router.push({name:"my"})
      this.$router.go(-1)
    },
    // 通过url 转为blob格式的数据(下载视频)
    getVideoArrayBuffer(url, name) {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.responseType = 'arraybuffer' // 返回类型blob
      xhr.onload = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const blob = this.response
          // console.log(blob)
          // 转换一个blob链接
          // 注: URL.createObjectURL() 静态方法会创建一个 DOMString(DOMString 是一个UTF-16字符串)，
          // 其中包含一个表示参数中给出的对象的URL。这个URL的生命周期和创建它的窗口中的document绑定
          const downLoadUrl = window.URL.createObjectURL(new Blob([blob], {
            type: 'video/mp4'
          }))
          // 视频的type是video/mp4，图片是image/jpeg
          // 01.创建a标签
          const a = document.createElement('a')
          // 02.给a标签的属性download设定名称
          a.download = name
          // 03.设置下载的文件名
          a.href = downLoadUrl
          // 04.对a标签做一个隐藏处理
          a.style.display = 'none'
          // 05.向文档中添加a标签
          document.body.appendChild(a)
          // 06.启动点击事件
          a.click()
          // 07.下载完毕删除此标签
          a.remove()
        }
      }
      xhr.send()
    },
    viderome(e){
      let obj=JSON.parse(localStorage.getItem("downvider"))
      console.log(obj)
      for(let i=0;i<this.filterlis.length;i++){
        if(this.filterlis[i].id==e){
          this.filterlis.splice(i,1)
        }
        if(obj[i]==e){
          if(obj.length==1){
            localStorage.removeItem("downvider")
          }else {
            obj.splice(i,1)
          localStorage.setItem("downvider",JSON.stringify(obj))
          }

        }
      }

    }
  },
  created() {
    let gets= JSON.parse(localStorage.getItem("downvider"))
    for(let i=0;i<gets.length;i++){
        this.$store.commit("vxdowmvideo",gets[i])
    }
    // console.log(this.vxdowmvideo)
    // console.log(get)
     get("free").then(data=>{
       // console.log(data.data)
       data.data.result.forEach(item=>{
         for(let j=0;j<gets.length;j++){
           if(item.id==gets[j]){
             this.filterlis.push(item)
           }
         }
       })
     })
  },
  computed:{
    ...mapState(["vxdowmvideo"])
  }

};
</script>

<style lang="less">
.filter_box{
  width: 100%;
  .filter_top{
    width: 100%;
    .van-nav-bar__title{
      font-size: 16px;
      font-weight: bold;
    }
    .van-nav-bar__arrow {
         font-size: 18px;
          color: #000000;
    }

  }
  .filter_bot{
    width: 100%;
    margin-top: 46px;
    .filterbot_top{
      width: 100%;
       .dowan{
         width: 100%;
        background: #F5F7FA;
         padding: 5px 15px;
         p{
           width: 100%;
           font-size: 14px;
           color: #6c6c6c;
         }
       }
      .filter_dowan{
        width: 100%;
        //height: 200px;
        //background-color: red;
        //overflow-y: auto;
        .filterdowan_box{
          width: 100%;
          padding: 5px 10px;
          border-bottom: 1px #ccc solid;
          display: flex;
          .img{
            width: 40%;
            height: 90px;
            img{
              width: 100%;
              height: 100%;
              background-size: cover;
              border-radius: 10px;
            }
          }
          .filter_name{
            position: relative;
            width: 60%;
            height: 90px;
            padding-left: 5px;
            p{
              width: 100%;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              padding-left: 10px;
            }
            & div{
              position: absolute;
              bottom: 0px;
              //width: 100%;
              right: 10px;
              text-align: right;
              font-size: 20px;
            }
            .videremove{
              position: absolute;
              button:0px;
              right: 50px;
            }

          }
        }
      }
    }
  //  已下载
  //  .filterbot_bot{
  //    width: 100%;
  //    & div:nth-child(1){
  //        width: 100%;
  //      background: #F5F7FA;
  //       padding: 5px 15px;
  //      p{
  //        width: 100%;
  //         font-size: 14px;
  //         color: #6c6c6c;
  //      }
  //    }
  //    .filter_yi{
  //       width: 100%;
  //      height: 350px;
  //      background-color: #ff833e;
  //      overflow-y: auto;
  //    }
  //
  //  }
  }

}
</style>