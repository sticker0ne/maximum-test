<template>
  <div class="wrapper">

    <!--Logo-->
    <router-link :class="logoClass" to="/">
      Maximum Education
    </router-link>

    <!--Course selector-->
    <course-selector class="selector"/>
  </div>
</template>

<script>
import CourseSelector from '@/components/courseSelector'

export default {
  name: 'headMenu',
  components: {CourseSelector},
  computed: {
    /**
     * Возвращает класс для логотипа, в зависимости от маршрута
     * @returns {string}
     */
    logoClass () {
      return this.$route.name === 'home' ? 'logo disabled' : 'logo'
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/styles/colors';

  .logo {
    display: inline-block;
    width: 192px;
    height: 36px;
    border-radius: 3px;
    background: $logo-background-enabled;
    cursor: pointer;
    color: $text-white;
    text-decoration: none;
    line-height: 34px;
    text-align: center;

    &.disabled {
      background: $logo-background-disabled;
      cursor: default;
    }
  }

  .selector {
    width: 300px;
    float: right;
  }
</style>
