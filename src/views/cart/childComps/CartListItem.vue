<template>
  <div>
    <div v-for="item in cartList" :key="item.iid" class="cart-list-main">
      <div class="cart-list-left">
        <input type="checkbox" class="check" v-model="item.checked" />
        <img :src="item.image" class="goods-img" />
      </div>
      <div class="cart-list-right">
        <div class="goods-name">{{item.title}}</div>
        <div class="goods-desc">{{item.desc}}</div>
        <div class="goods-info">
          <span class="price">￥{{item.price}}</span>
          <span class="count">x{{item.count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartListItem",
  props: {
    cartList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {},
};
</script>

<style scoped>
.cart-list-main {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ececec;
}
.cart-list-left {
  width: 26%;
  align-items: center;
}
.check {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  overflow: hidden;
  border: 1px solid #ececec;
}
.goods-img {
  width: 52px;
  height: 66px;
  overflow: hidden;
  border: 1px solid #ececec;
  margin: 0 10px;
  border-radius: 6px;
  vertical-align: middle;
}
.cart-list-right {
  width: 74%;
  position: relative;
}
.goods-name {
  width: 100%;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.goods-desc {
  font-size: 12px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 10px;
}
.goods-info {
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 16px;
}
.price {
  font-size: 16px;
}
</style>