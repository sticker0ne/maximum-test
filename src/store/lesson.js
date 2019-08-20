import axios from 'axios'

const state = {
  list: [],
  fetched: false
}

const mutations = {

  /**
   * Очищает стор
   * @param state
   * @constructor
   */
  CLEAR (state) {
    state.list = []
  },

  /**
   * Добавляет объект в стор
   * @param state
   * @param lesson Объект, который нужно добавить
   * @constructor
   */
  ADD (state, {lesson}) {
    state.list.push(lesson)
  },

  /**
   * Добавляет коллекцию в стор
   * @param state
   * @param lessons коллекция, которую нужно добавить
   * @param fetched Если передано true, поднимает флаг в стэйте
   * @constructor
   */
  ADD_LIST (state, {lessons, fetched = false}) {
    state.list = [...state.list, ...lessons]
    state.fetched |= fetched
  },
  /**
   * Удаляет объект из стора
   * @param state
   * @param lesson Объект либо id объекта, который нужно удалить
   * @constructor
   */
  REMOVE (state, {lesson}) {
    let id = lesson.id || lesson
    if (!id) throw new Error('Cannot remove lesson from store, invalid input type')

    let idx = state.list.findIndex(item => item.id === id)
    if (idx < 0) return

    state.list.splice(idx, 1)
  }
}

const getters = {
  byId: (state) => (id) => {
    return state.list.find(lesson => lesson.id === id)
  },
  byCourseId: (state) => (courseId) => {
    return state.list.filter(lesson => lesson.courseId === courseId)
  }
}

const actions = {
  async fetch ({commit}) {
    let res = await axios.get(`/lessons`).then(({data}) => {
      commit('CLEAR')
      commit('ADD_LIST', {lessons: data.map(item => {
        item.id = item.id.toString()
        item.courseId = item.courseId.toString()
        return item
      }),
      fetched: true})
    })
    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
