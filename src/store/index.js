import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//2.创建store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    //唯一目的就是修改state中的状态
    //每个方法完成的事件比较单一
    addCounter(state, payload) {
      payload.count++
    },
    addToCart(state, payload) {
      state.cartList.push(payload)
    }
  },
  actions: {
    addCart({state,commit}, payload) {
      // let oldProduct = null
      // for (let item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item;
      //   }
      // }
      //数组find()方法 返回找到的第一个元素的值
			let oldProduct = state.cartList.find(function(item){
				return item.iid === payload.iid
			})
      if (oldProduct) {
        // oldProduct.count += 1
        commit('addCounter',oldProduct)
      } else {
        payload.count = 1;
        payload.checked = true;
        commit('addToCart',payload)
        }
    }
  }
})
//3.挂载
export default store