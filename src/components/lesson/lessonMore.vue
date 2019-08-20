<template>
  <div class="wrapper">

    <!--Image with divider-->
    <img :src="`https://picsum.photos/940/340?random=${Math.random()}`"/>
    <div class="horizontal-divider"></div>

    <!--Statistic Tab-->
    <router-link :class="currentTab === 'statistic' ? 'selected' : ''"
                 :to="`/lesson/${$route.params.id}/statistic`"
                 class="tab-button">
      Статистика
      <i class="fas fa-chevron-up" v-if="currentTab === 'statistic'"></i>
      <i class="fas fa-chevron-down" v-else></i>
    </router-link>

    <!--Tests Tab-->
    <router-link :class="currentTab === 'test' ? 'selected' : ''"
                 :to="`/lesson/${$route.params.id}/test`"
                 class="icon tab-button">
      Тесты
      <i class="fas fa-chevron-up" v-if="currentTab === 'test'"></i>
      <i class="fas fa-chevron-down" v-else></i>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'lessonMore',
  props: {
    value: { type: Object, default: () => { } }
  },
  computed: {
    /**
     * Возвращает текущую выбранную вкладку (роут)
     * @returns {string} выбранная вкладка
     */
    currentTab () {
      if (this.$route.name === 'lesson-statistic') return 'statistic'
      if (this.$route.name === 'lesson-test') return 'test'
      return ''
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/styles/colors";

  .tab-button {
    font-size: 30px;
    text-decoration: none;
    color: $color-blue;
    margin-right: 50px;

    i {
      font-size: 25px;
    }

    &.selected {
      cursor: default;
      color: $text-gray;
    }
  }
</style>
