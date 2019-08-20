import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home'
import Schedule from '@/pages/schedule'
import Lesson from '@/pages/lesson'
import Test from '@/components/lesson/test'
import Statistic from '@/components/lesson/statistic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: Schedule
    },
    {
      path: '/lesson/:id',
      name: 'lesson',
      component: Lesson,
      children: [
        {name: 'lesson-test', path: 'test', component: Test},
        {name: 'lesson-statistic', path: 'statistic', component: Statistic}
      ]
    }
  ]
})
