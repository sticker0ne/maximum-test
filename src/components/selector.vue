<template>
  <select @change="select" ref="select" class="select">
    <!-- Placeholder -->
    <option v-if="placeholder" class="disabled selected hidden" data-id="placeholder">{{placeholder}}</option>
    <option
      v-for="(item, key) in items" :key="key"
      :selected="item.id === value ? 'selected' : ''"
      :data-id="item.id">
      {{item.name}}
    </option>
  </select>
</template>

<script>
export default {
  name: 'selector',
  props: {
    items: {type: Array, default: () => []},
    placeholder: {type: String, default: null},
    value: {type: String, default: ''}
  },
  methods: {
    /**
     * При изменении выбранного элемента эмитит событие input, если элемент содержит id
     */
    select () {
      try {
        let id = this.$refs.select.selectedOptions[0].dataset.id
        if (id) {
          this.$emit('input', id)
          this.$emit('change', id)
        }
      } catch (e) {
        console.warn('selected option has no id')
      }
    }
  }
}
</script>

<style scoped>

</style>
