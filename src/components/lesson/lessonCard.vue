<template>
  <router-link :to="`/lesson/${value.id}`" class="card shadowed">
    <div :style="`background-image: url(https://picsum.photos/300/200?random=${Math.random()});`" class="image"></div>
    <div class="text">{{value.title}}</div>
    <div class="dimmer">Перейти</div>
  </router-link>
</template>

<script>
export default {
  name: 'lessonCard',
  props: {
    value: {type: Object, required: true}
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/styles/colors";

  .card {
    text-decoration: none;
    color: $text-black;
    position: relative;
    overflow: hidden;
    font-size: 20px;
    width: 295px;
    height: 260px;
    border-radius: 8px;
    cursor: pointer;
    margin: 0 18px 40px 0;

    background: $color-white;

    .image {
      border-radius: 8px 8px 0 0;
      height: 200px;
    }

    .text {
      margin: 20px;
    }

    .dimmer {
      background: rgba(0, 0, 0, .3);
      position: absolute;
      top: -60px;
      width: 100%;
      height: 60px;
      color: rgba(255, 255, 255, 0.5);
      text-align: center;
      line-height: 60px;
    }

    &:hover {
      .dimmer {
        transition-duration: 0.2s;
        top: 0;
      }
    }
  }
</style>
