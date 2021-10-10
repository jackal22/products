import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'ProductList',
        storage: localStorage       
    })
  ],

  state: {
    ProductList: []
  },

  mutations: {
    AddProduct(state, payload){
      state.ProductList.push(payload)
    },
    RemoveProduct(state, payload){
      state.ProductList.splice(payload, 1)
    },





    SetProductList(state, payload){
      state.ProductList = []
      state.ProductList = payload
    }
  },

  actions: {
    AddProduct(context, payload){
      context.commit('AddProduct', payload)
    },
    RemoveProduct(context, payload){
      context.commit('RemoveProduct', payload)
    },
    SetProductList(context, payload){
      context.commit('SetProductList', payload)

    }

  },
})