<template>
  <div class="bot-bar-wrap">
    <div class="bot-bar-item">
      <p>
        <img src="../../../assets/img/detail/icon01.png" alt />
      </p>
      <p>客服</p>
    </div>
    <div class="bot-bar-item">
      <p>
        <img src="../../../assets/img/detail/icon02.png" alt />
      </p>
      <p>店铺</p>
    </div>
    <div class="bot-bar-item">
      <p>
        <img src="../../../assets/img/detail/icon03.png" alt />
      </p>
      <p>收藏</p>
    </div>
    <div class="btn cart-btn">加入购物车</div>
    <div class="btn buy-btn">购买</div>
  </div>
</template>

<script>
export default {
  name: "DetailBotBar",
};
</script>

<style scoped>
.bot-bar-wrap {
  height: 49px;
  background-color: #fff;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  display: flex;
  border-top: 2px solid #f2f5f8;
}
.bot-bar-item {
  width: 16%;
  font-size: 12px;
  color: #333;
  text-align: center;
}
.bot-bar-item img {
  width: 22px;
  height: 22px;
  margin: 4px 0;
  vertical-align: middle;
}
.btn {
  width: 26%;
  font-size: 14px;
  line-height: 49px;
  text-align: center;
}
.cart-btn {
  background-color: #f9cd0b;
}
.buy-btn {
  background-color: var(--color-high-text);
  color: #fff;
}
</style>