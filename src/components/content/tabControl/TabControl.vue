<template>
  <div class="tab-control">
    <div
      v-for="(item,index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{active: index=== currentIndex}"
      @click="itemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
  <!-- 只是文字不同 没有必要插槽 -->
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0, //记录当前点击的是哪一个就
    };
  },
  methods: {
    itemClick(index) {
      //改变currentIndex
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style>
.tab-control {
  display: flex;
  justify-content: space-around;
  text-align: center;
  height: 40px;
  line-height: 44px;
  font-size: 15px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}
.active span {
  color: var(--color-high-text);
  border-bottom: 2px solid var(--color-high-text);
}
</style>