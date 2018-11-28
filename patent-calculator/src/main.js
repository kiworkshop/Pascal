import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import { store } from './vuex/store'
import axios from 'axios'
import SearchManager from './plugins/searchManager'
import VueSession from 'vue-session'

Vue.config.productionTip = false;
Vue.prototype.$noticeEventBus = new Vue();
Vue.prototype.$submissionAlarmBus = new Vue();
Vue.prototype.$productTransmissionBus = new Vue();
Vue.prototype.$searchManager = new SearchManager();
Vue.prototype.$http = axios;
Vue.use(VueSession)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
