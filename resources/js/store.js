import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'ProductsInfos',
        storage: localStorage       
    })
  ],

  state: {
    ProductsInfos: []
  },

  mutations: {
    AddItems(state, payload){
      state.ProductsInfos.push(payload)
    },
    RemoveItems(state, payload){
      state.ProductsInfos.splice(payload, 1)
    },
    PushFromDB(state, payload){
      state.ProductsInfos = []
      state.ProductsInfos = payload
    }
  },

  actions: {
    AddItems(context, payload){
      context.commit('AddItems', payload)
    },
    RemoveItems(context, payload){
      context.commit('RemoveItems', payload)
    },
    PushFromDB(context, payload){
      context.commit('PushFromDB', payload)

    }

  },
})