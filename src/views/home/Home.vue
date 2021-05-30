<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends" />
  </div>
</template>

<script>
import NavBar from "@components/common/navbar/NavBar";
import { getHomeMultidate } from "@network/home";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
  },
  data() {
    return {
      //   result: null,
      banners: [],
      recommends: [],
    };
  },
  created() {
    getHomeMultidate().then((res) => {
      // res=>指向大的data对象 函数结束后 res会被回收
      // 但是由于让result指向了data 则 res被回收后 data依然存在
      //   this.result = res;
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
};
</script>
<style>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
