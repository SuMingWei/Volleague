import Vue from 'vue'
import App from './App.vue'
import Router from './router'

Vue.config.productionTip = false

import '@/css/font.css'

new Vue({
  render: h => h(App),
  router: Router,
}).$mount('#app')
