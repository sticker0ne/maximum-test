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
     * @param course Объект, который нужно добавить
     * @constructor
     */
  ADD (state, {course}) {
    state.list.push(course)
  },

  /**
     * Добавляет коллекцию в стор
     * @param state
     * @param courses коллекция, которую нужно добавить
     * @param fetched Если передано true, поднимает флаг в стэйте
     * @constructor
     */
  ADD_LIST (state, {courses, fetched = false}) {
    state.list = [...state.list, ...courses]
    state.fetched |= fetched
  },
  /**
     * Удаляет объект из стора
     * @param state
     * @param course Объект либо id объекта, который нужно удалить
     * @constructor
     */
  REMOVE (state, {course}) {
    let id = course.id || course
    if (!id) throw new Error('Cannot remove course from store, invalid input type')

    let idx = state.list.findIndex(item => item.id === id)
    if (idx < 0) return

    state.list.splice(idx, 1)
  }
}

const getters = {
  byId: (state) => (id) => {
    return state.list.find(course => course.id === id)
  }
}

const actions = {
  async fetch ({commit}) {
    let res = await axios.get(`/courses`).then(({data}) => {
      commit('CLEAR')
      commit('ADD_LIST', {courses: data.map(item => {
        item.id = item.id.toString()
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
