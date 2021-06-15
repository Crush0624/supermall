<template>
  <div>
    <div class="cart-list-wrap">
      <cart-list-item :cartList="cartList"></cart-list-item>
    </div>
  </div>
</template>

<script>
import CartListItem from "./CartListItem.vue";
export default {
  name: "CartList",
  components: { CartListItem },
  computed: {
    cartList() {
      return this.$store.state.cartList;
    },
  },
  methods: {},
};
</script>

<style>
</style>