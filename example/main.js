import Vue from 'vue'

import taurus from 'aid-taurus-desktop'

// import TFrame from '../src/frame'
// import { TFrame } from '../src'

import { TFrame } from '../lib/frame.js'
import App from './app.vue'

import router from './routers'

require('../lib/frame.css')

Vue.use(taurus)

// Vue.component(TFrame.name, TFrame)
Vue.use(TFrame)

new Vue({
  router,
  render (h) {
    return h(App)
  }
}).$mount('#app')
