import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import { store } from './vuex/store'

Vue.config.productionTip = false;
Vue.prototype.$noticeEventBus = new Vue();
Vue.prototype.$submissionAlarmBus = new Vue();
Vue.prototype.$productTransmissionBus = new Vue();

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
