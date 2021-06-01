<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    console.log();
    //不使用querry进行识别 使用标签中ref
    //如果ref绑定在组件中 this.$refs.refname获取的是组件对象
    //如果ref绑定在普通元素中 this.$refs.refname获取的是一个元素对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      // mouseWheel: true,
    });
    this.scroll.scrollTo(0, 0);
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
  },
};
</script>

<style scoped>
</style>