<template>
  <div class="wrapper">
    <div class="page-sub-title" v-if="course">{{selectedCourse.type + ' - ' + selectedCourse.title}}</div>
    <div class="page-title" v-if="lesson">{{lesson.title}}</div>

    <lesson-more :value="lesson"/>
    <router-view/>
  </div>
</template>

<script>
import LessonMore from '@/components/lesson/lessonMore'
import {routeParseHelper} from '@/mixins/routeParseHelper'

export default {
  name: 'lesson',
  mixins: [routeParseHelper],
  components: {LessonMore},
  data () {
    return {
      lessonsLoaded: false
    }
  },
  computed: {
    /**
     * Возвращает текущее занятие со стора
     * @returns {*} null or lesson
     */
    lesson () {
      return this.$store.getters['lesson/byId'](this.$route.params.id)
    }
  },
  methods: {
    /**
     * Вызывает действие заполнения стора занятий если стор не заполнен
     */
    fetchLessonsIfNecessary () {
      if (this.$store.state.lesson.fetched) return Promise.resolve().then(this.lessonsLoaded = true)

      return this.$store.dispatch('lesson/fetch').then(() => {
        this.lessonsLoaded = true
      })
    }
  },
  created () {
    this.fetchLessonsIfNecessary()
  }
}
</script>

<style scoped>

</style>
