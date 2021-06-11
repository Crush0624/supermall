<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goodsItem.show.img" alt />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.orgPrice}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    itemClick() {
      this.$router.push("/detail" + this.goodsItem.iid);
    },
  },
};
</script>

<style>
.goods-item {
  /* 与下一行的item距离 */
  padding-bottom: 40px;
  /* 自绝父相对 */
  position: relative;

  width: 48%;
}
.goods-item img {
  width: 100%;
  /* 边框圆角程度 */
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  /* 设置定位 */
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  /* 显示省略符号来代表被修剪的文本 */
  text-overflow: ellipsis;
  /* 规定段落中的文本不进行换行 */
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: "";
  position: absolute;
  /* supermall\src\assets\img\common\collect.svg */
  /* C:/Users/Crush/Desktop/Vue学习/supermall/src/assets/img/common/collect.svg */
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>