/*入口js
*/
import Vue from 'vue'
import App from './App.vue'
import FastClick from 'fastclick'
import router from './router'
import store from './store'

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