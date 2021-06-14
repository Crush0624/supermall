<template>
  <div class="recommend-info-wrap" v-if="Object.keys(recommendInfo).length !== 0">
    <div v-for="(item,index) in recommendInfo" :key="index" class="detail-recommend-item">
      <img :src="item.image" class="recommend-info-img" @click="itemClick(item)" />
      <div class="recommend-info-title">{{item.title}}</div>
      <div>
        <span class="recommend-info-price">{{item.discountPrice}}</span>
        <span class="recommend-info-collect">{{item.cfav}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailRecommandInfo",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    recommendInfo: {
      type: Array,
      default() {},
    },
  },
  methods: {
    itemClick(item) {
      this.$router.push("/detail" + item.item_id);
    },
  },
  watch: {
    $route(to, from) {
      this.$router.go(0);
    },
  },
};
</script>

<style scoped>
.recommend-info-wrap {
  display: flex;
  padding: 0 8px;
  flex-wrap: wrap;
  justify-content: space-between;
  border-top: 4px solid #ececec;
}
.detail-recommend-item {
  width: 49%;
  margin-top: 5px;
  text-align: center;
}
.recommend-info-img {
  width: 100%;
  border-radius: 5px;
}
.recommend-info-title {
  font-size: 14px;
  /* 多出部分省略号 */
  text-overflow: ellipsis;
  /* 不进行换行 */
  white-space: nowrap;
  /* 隐藏溢出 */
  overflow: hidden;
  margin: 4px 1px;
  width: 100%;
}
.recommend-info-price {
  color: var(--color-high-text);
  margin-right: 20px;
  font-size: 13px;
}
.recommend-info-collect {
  font-size: 13px;
  position: relative;
}
.recommend-info-collect::before {
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