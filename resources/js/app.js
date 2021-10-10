
import Vue from 'vue'
import App from './views/App.vue'
import router from './routes.js'
import store from './store'
import Vuetify from 'vuetify';

import * as CrudFunc from './class/crudfunctions.class';

Vue.config.productionTip = false
Vue.use(router);
Vue.use(Vuetify);

Vue.prototype.$CrudFunc = new CrudFunc.crudfunctions();

export const bus = new Vue(); //event bus

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount('#app')