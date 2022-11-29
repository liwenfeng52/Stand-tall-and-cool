<template>
  <div>
    <van-tabbar v-model="active" active-color="#4FC08D" route>
      <van-tabbar-item
        :icon="item.icon"
        v-for="item in icon"
        :key="item.id"
        :to="item.to"
        >{{ item.name }}</van-tabbar-item
      >
    </van-tabbar>
    <keep-alive include="name,memder,my,study">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "home",
      icon: [
        {
          id: 1,
          to: "/paren/home",
          name: "首页",
          icon: "wap-home",
          color: "",
        },
        {
          id: 2,
          to: "/paren/memder",
          name: "会员",
          icon: "gem-o",
          color: "#4FC08D",
        },
        {
          id: 3,
          to: "/paren/study",
          name: "学习",
          icon: "records",
          color: "#4FC08D",
        },
        {
          id: 4,
          to: "/paren/my",
          name: "我的",
          icon: "user-circle-o",
          color: "red",
        },
      ],
    };
  },
};
</script>

<style>
</style>