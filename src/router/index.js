import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/paren",
    name: "paren",
    alias: "/",
    component: () => import("../views/Paren.vue"),
    children: [
      {
        path: "home",
        name: "home",
        alias: "/",
        component: () => import('../views/Home.vue'),
        meta: {
          title: "首页"
        }
      },
      {
        path: "memder",
        name: "memder",
        component: () => import('../views/Memder.vue'),
        meta: {
          title: "会员"
        }
      },
      {
        path: "study",
        name: "study",
        component: () => import('../views/Study.vue'),
        meta: {
          title: "学习"
        }
      },
      {
        path: "my",
        name: "my",
        component: () => import("../views/My.vue"),
        meta: {
          title: "我的"
        }
      },
    ],
    meta: {
      title: "首页"
    }
  },
  {
    path: "/seach",
    name: "seach",
    component: () => import('../other/Seach.vue'),
    meta: {
      title: "商品信息"
    }
  }, {
    path: "/register",
    name: "register",
    component: () => import("../other/Register.vue"),
    meta: {
      title: "登录页"
    }
  },
  {
    path: "/mdrvideo",
    name: "mdrvider",
    component: () => import("../other/Mdrvideo.vue"),
    meta: {
      title: "会员视频"
    }
  }, {
    // 购物车
    path: "/mycart",
    name: "mycart",
    component: () => import("../other/Mycart.vue"),
    meta: {
      title: "购物车"
    }
  }, {
    // 免费直播
    path: "/homefiree",
    name: "homefiree",
    component: () => import('../other/Homefiree.vue'),
    meta: {
      title: "直播间"
    }
  }, {
    // 钱包
    path: "/mymoney",
    name: "mymoney",
    component: () => import("../other/Mymoney.vue"),
    meta: {
      title: "充值页面"
    }
  }, {
    // 我的订单
    path: "/myorder",
    name: "myorder",
    component: () => import('../other/Myorder.vue'),
    meta: {
      title: "订单信息"
    }
  },{
  path: "/filter",
    name:"filter",
    component:()=>import("../other/Filter"),
    meta: {
    title:"下载"
    }

  }
]


const router = new VueRouter({
  routes
})

export default router
