<template>
  <v-select :clearable="false"
            :options="courses"
            @input="navigate"
            label="name"
            placeholder="Выберите курс..."
            v-model="selectedCourse"></v-select>
</template>

<script>
import Selector from '@/components/selector'
import {routeParseHelper} from '@/mixins/routeParseHelper'

export default {
  name: 'courseSelector',
  components: {Selector},
  mixins: [routeParseHelper],

  data () {
    return {
      coursesLoaded: false
    }
  },
  computed: {
    /**
       * returns {Array} Список курсов из стора отсортированный по типу
       */
    courses () {
      return [...this.$store.state.course.list].sort((first, second) => {
        return first.type > second.type ? 1 : -1
      }).map(course => {
        return {id: course.id, name: `${course.type} - ${course.title}`}
      })
    }
  },
  methods: {
    /**
       * Тянет данные о курсах с бэка, поднимает флаг loaded по окончинии загрузки
       */
    fetchCourses () {
      return this.$store.dispatch('course/fetch').then(() => {
        this.coursesLoaded = true
      })
    },
    /**
       * Перенаправляет на страницу расписания при изменении выбранного курса
       */
    navigate () {
      if (!this.courseId) return
      this.$router.push({path: '/schedule', query: {courseId: this.courseId}})
    }
  },
  created () {
    this.fetchCourses()
  }
}
</script>
