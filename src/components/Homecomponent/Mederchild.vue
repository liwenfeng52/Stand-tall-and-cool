<template>
  <div>
    <div class="meder">
      <form action="/">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          shape="round"
          @cancel="clickmeder"
        />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  methods: {
    clickmeder() {
      this.$emit("iteme", false);
      // console.log(this);
    },
  },
};
</script>

<style>
.meder {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 12px;
}
.meder .van-search__action {
}
</style>