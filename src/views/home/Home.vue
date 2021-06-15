<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      class="tab-control"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :click="true"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 传值时不加冒号，直接当成字符串 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行','新款','精选']"
        class="tab-control"
        @tabClick="tabClick"
        ref="tabControl2"
        :class="{fixed:isTabFixed}"
      />
      <!-- <span>{{this.goods.pop.list[0]}}</span> -->
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 直接监听组件点击,必须加上native-->
    <main-tab-bar />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import { getHomeMultidate, getHomeGoods } from "@network/home";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "@components/common/navbar/NavBar";
import TabControl from "@components/content/tabControl/TabControl";
import GoodsList from "@components/content/goods/GoodsList";
import Scroll from "@components/common/scroll/Scroll";
import BackTop from "@components/content/backTop/BackTop";
import MainTabBar from "../../components/content/maintabbar/MainTabBar.vue";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    MainTabBar,
  },
  data() {
    return {
      //   result: null,
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      taboffsetTop: 0,
      isTabFixed: false,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  //created中一般只写代码的主要逻辑
  created() {
    this.getHomeMultidate1();
    //页面一生成，只请求各个页面的第一页数据
    this.getHomeGoods1("pop");
    this.getHomeGoods1("new");
    this.getHomeGoods1("sell");
  },
  //不能在mounted获取offsetTop 此时图片没有加载完全 获取的offsetTop值不一定是正确的
  //监听轮播图的加载情况 一旦轮播图加载 offsetTop值基本正确 可以达到吸顶效果
  mounted() {
    // console.log(this.$refs.tabControl.$el.offsetTop);
    // new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 20);
    // }).then((res) => {
    //   console.log(this.$refs.tabControl.$el.offsetTop);
    // });
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      //面向组件的ScrollTo方法
      this.$refs["scroll"].scrollTo(0, 0);
    },
    contentScroll(position) {
      //1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
      //2.吸顶效果
      this.isTabFixed = -position.y > this.taboffsetTop;
    },
    loadMore() {
      this.getHomeGoods1(this.currentType);
      //进行实时刷新 避免出现content高度无法响应式计算的问题
      this.$refs.scroll.scroll.refresh();
    },
    getHomeMultidate1() {
      getHomeMultidate().then((res) => {
        // res=>指向大的data对象 函数结束后 res会被回收
        // 但是由于让result指向了data 则 res被回收后 data依然存在
        //   this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods1(type) {
      // 获取当前的page 然后＋1即下一次要获取的page
      const page = this.goods[type].page + 1;
      //请求商品数据
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },
    swiperImageLoad() {
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
};
</script>
// scoped作用域
<style scoped>
#home {
  /* padding-top: 44px; */
  /* vh视口宽度 */
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* 在使用浏览器原生滚动时 为了让导航不跟随一起滚动 */
  /* position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9; */
}
/* .fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
.home ul li {
  font-size: 20;
}
.tab-control {
  position: relative;
  z-index: 9;
}
.content {
  /* 计算scroll的高度 */
  /* height: calc(100vh - 93px); */
  /* 需要留一段margin-top给tabbar */
  /* margin-top: 44px; */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
