<template>
  <div class="goods">
    <goods-list-Item v-for="(item,index) in goods" :key="index" :goods-item="item" />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListitem";
export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.goods {
  display: flex;
  /* 规定灵活的项目在必要的时候拆行或拆列 */
  flex-wrap: wrap;
  /* 居中 */
  justify-content: space-around;

  padding: 2px;
}
</style>