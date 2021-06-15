<template>
  <div id="cart-wrap">
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{num}})</div>
    </nav-bar>
    <scroll class="cart-content" ref="scroll" :probe-type="3" :click="true">
      <cart-list></cart-list>
    </scroll>
    <main-tab-bar class="cart-tab" />
  </div>
</template>

<script>
import NavBar from "@components/common/navbar/NavBar";
import CartList from "./childComps/CartList.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import MainTabBar from "../../components/content/maintabbar/MainTabBar.vue";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    Scroll,
    MainTabBar,
  },
  computed: {
    num() {
      return this.$store.state.cartList.length;
    },
  },
  methods: {},
};
</script>

<style scoped>
#cart-wrap {
  position: relative;
  background-color: #fff;
  height: 100vh;
}
.cart-content {
  height: calc(100% - 93px);
  position: relative;
  z-index: 8;
}
.cart-nav-bar {
  position: relative;
  color: #fff;
  background-color: var(--color-tint);
  z-index: 10;
}
.cart-tab {
  z-index: 10;
}
</style>