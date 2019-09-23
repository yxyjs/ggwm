/*入口js
*/
import Vue from 'vue'
import App from './App.vue'
import FastClick from 'fastclick'
import router from './router'
import store from './store'

import loading from './common/imgs/loading.gif'
import './fiters'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading
})

import "./mock/mockServer"

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body
    )
  }, false);
}


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})