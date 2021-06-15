<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3" :click="true">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" class="detail-goods-info"></detail-goods-info>
      <detail-parm-info :paramInfo="paramInfo" ref="param"></detail-parm-info>
      <detail-comments-info :commentInfo="commentInfo" ref="comment"></detail-comments-info>
      <detail-recommend-info :recommendInfo="recommendInfo" ref="recommend"></detail-recommend-info>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bot-bar @addCart="addCart"></detail-bot-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParmInfo from "./childComps/DetailParmInfo.vue";
import DetailCommentsInfo from "./childComps/DetailCommentsInfo.vue";
import DetailRecommendInfo from "./childComps/DetailRecommendInfo.vue";
import DetailBotBar from "./childComps/DetailBotBar.vue";

import BackTop from "@components/content/backTop/BackTop";
import Scroll from "@components/common/scroll/Scroll";

import { debounce } from "@common/utils";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "@network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    Scroll,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParmInfo,
    BackTop,
    DetailCommentsInfo,
    DetailRecommendInfo,
    DetailBotBar,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      isShowBackTop: false,
      themeTopY: [],
      commentInfo: [],
      recommendInfo: [],
      currentIndex: 0,
    };
  },
  created() {
    this.iid = this.$route.params.id;

    getDetail(this.iid).then((res) => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo;
      // console.log(data);

      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list;
        // console.log(this.commentInfo);
      }
    });
    getRecommend().then((res) => {
      this.recommendInfo = res.data.list;
      console.log(this.commentInfo);
    });
    this.getThemeTopY = debounce(() => {
      this.themeTopY = [];
      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.param.$el.offsetTop - 44);
      this.themeTopY.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop - 44);
      //多push一个值 在后面判断的时候可以省略步骤
      this.themeTopY.push(Number.MAX_VALUE);
    }, 100);
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.scroll.refresh();
      this.getThemeTopY();
    },
    backClick() {
      //面向组件的ScrollTo方法
      this.$refs["scroll"].scrollTo(0, 0);
    },
    titleClick(index) {
      // this.$refs.nav.currentIndex = index;
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 300);
    },
    //监听位置信息
    contentScroll(position) {
      this.isShowBackTop = -position.y > 500;
      const positiony = -position.y;
      let _lenth = this.themeTopY.length;
      for (let i = 0; i < _lenth - 1; i++) {
        if (
          this.currentIndex != i &&
          positiony > this.themeTopY[i] &&
          positiony < this.themeTopY[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    addCart() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      console.log(this.goods);

      // this.$store.commit("addCart", product);

      //含有异步操作，数据提交至 actions ，可用于向后台提交数据
      this.$store.dispatch("addCart", product);
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav-bar {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
}
.detail-goods-info {
  position: relative;
}
</style>