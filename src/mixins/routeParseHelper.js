export const prepareCourse = (course) => {
  if (!course) return {}
  course.name = course.name = `${course.type} - ${course.title}`
  return course
}

export const routeParseHelper = {
  data () {
    return {
      course: {},
      page: 1
    }
  },
  computed: {
    /**
     * Для определенных роутов получает course из route
     */
    selectedCourse: {
      get: function () {
        switch (this.$route.name) {
          case 'schedule':
            if (this.$route.query.courseId) {
              return prepareCourse(this.$store.getters['course/byId'](this.$route.query.courseId))
            }
            break
          case 'lesson':
          case 'lesson-test':
          case 'lesson-statistic': {
            if (!this.$route.params.id) return
            let lesson = this.$store.getters['lesson/byId'](this.$route.params.id)
            let course = lesson ? this.$store.getters['course/byId'](lesson.courseId) : null
            return prepareCourse(course)
          }
        }

        return null
      },
      set: function (value) {
        this.courseId = value.id
      }
    },
    /**
     * Для всех роутов получает из query pageNumber
     */
    pageNumber: {
      get: function () {
        if (this.$route.query.page) return parseInt(this.$route.query.page)
        return 1
      },
      set: function (value) {
        this.page = value
      }
    }
  }
}
