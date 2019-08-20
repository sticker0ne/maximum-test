<template>
  <div class="wrapper">

    <!--Title-->
    <div class="page-sub-title" v-if="selectedCourse">{{selectedCourse.type + ' - ' + selectedCourse.title}}</div>
    <div class="page-title">Расписание занятий</div>

    <!--Lesson cards-->
    <div class="section">
      <lesson-card :key="key" :value="lesson" v-for="(lesson, key) in paginatedLessons"/>
    </div>

    <div class="horizontal-divider"></div>

    <!--Pagination-->
    <pagination-bar
      :itemsAmount="filteredLessons.length"
      :itemsPerPage="itemsPerPage"
      @input="paginate"
      v-model="pageNumber"
    />
  </div>
</template>

<script>
import {routeParseHelper} from '@/mixins/routeParseHelper'
import PaginationBar from '@/components/paginationBar'
import LessonCard from '@/components/lesson/lessonCard'

export default {
  name: 'schedule',
  components: {LessonCard, PaginationBar},
  mixins: [routeParseHelper],
  data () {
    return {
      itemsPerPage: 5,
      lessonsLoaded: false
    }
  },
  computed: {
    /**
       * Возвращает список занятий, с определенным courseId
       * Зависит от MIXIN routeParseHelper
       */
    filteredLessons () {
      if (!this.selectedCourse) return []
      return this.$store.getters['lesson/byCourseId'](this.selectedCourse.id)
    },
    /**
       * Возвращает необходимое кол-во занятий, в зависимости от выбранной страницы
       * Зависит от MIXIN routeParseHelper
       */
    paginatedLessons () {
      let startIndex = (this.pageNumber - 1) * this.itemsPerPage
      return this.filteredLessons.slice(
        startIndex,
        startIndex + this.itemsPerPage
      )
    }
  },
  methods: {
    /**
       * Тянет данные об уроках с бэка, поднимает флаг loaded по окончинии загрузки
       */
    fetchLessons () {
      return this.$store.dispatch('lesson/fetch').then(() => {
        this.lessonsLoaded = true
      })
    },
    /**
       * Вызывается при изменении выбранной страницы в paginationBar, обновляет роут
       */
    paginate () {
      this.$router.push({query: {...this.$route.query, page: this.page}})
    }
  },
  created () {
    this.fetchLessons()
  }
}
</script>

<style scoped lang="scss">
  .section {
    display: flex;
    flex-wrap: wrap;
  }
</style>
