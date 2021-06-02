<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import PullUp from "@better-scroll/pull-up";
import PullDown from "@better-scroll/pull-down";

BScroll.use(PullUp);
BScroll.use(PullDown);
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    click: {
      type: Boolean,
      default: false,
    },
    pullUpLoad: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    console.log();
    //不使用querry进行识别 使用标签中ref
    //如果ref绑定在组件中 this.$refs.refname获取的是组件对象
    //如果ref绑定在普通元素中 this.$refs.refname获取的是一个元素对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: this.click,
      // 通过props决定是否进行监听
      probeType: this.probeType,
      // mouseWheel: true,
      pullUpLoad: this.pullUpLoad,
      observeImage: true,
      observeDOM: true,
    });
    //监听滚动的区域/位置
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("scroll", position);
    });
    //监听上拉事件
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
  },
};
</script>

<style scoped>
</style>