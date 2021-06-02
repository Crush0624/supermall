<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
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
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" />
      <!-- <span>{{this.goods.pop.list[0]}}</span> -->
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 直接监听组件点击,必须加上native-->
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
    },
    backClick() {
      //面向组件的ScrollTo方法
      this.$refs["scroll"].scrollTo(0, 0);
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;
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
  },
};
</script>
// scoped作用域
<style scoped>
#home {
  /* padding-top: 44px; */
  /* vh视口宽度 */
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
.home ul li {
  font-size: 20;
}
.content {
  /* 计算scroll的高度 */
  height: calc(100vh - 93px);
  /* 需要留一段margin-top给tabbar */
  margin-top: 44px;
  overflow: hidden;
  z-index: 9;
}
</style>
