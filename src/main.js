// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import Axios from 'axios'
import vSelect from 'vue-select'

import '@/assets/styles/index.scss'
import 'vue-select/src/scss/vue-select.scss'

Vue.config.productionTip = false
Vue.component('v-select', vSelect)

Axios.defaults.baseURL = process.env.API_ENDPOINT

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
