import Vue from 'vue'
import Vuex from 'vuex'

import course from '@/store/course'
import lesson from '@/store/lesson'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    course,
    lesson
  }
})
