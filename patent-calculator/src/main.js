import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import firebase from 'firebase'

Vue.config.productionTip = false

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCdmCxOB54j8Gq4_qQ-ZmRVMwhhtlivvhY",
  authDomain: "trademark-quotation.firebaseapp.com",
  databaseURL: "https://trademark-quotation.firebaseio.com",
  projectId: "trademark-quotation",
  storageBucket: "trademark-quotation.appspot.com",
  messagingSenderId: "632762029401"
};
firebase.initializeApp(config);

new Vue({
  render: h => h(App)
}).$mount('#app')
