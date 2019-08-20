<template>
  <div class="wrapper">
    <img :src="`https://picsum.photos/940/340?random=${Math.random()}`" />
    <div class="mock">Здесь будет главная страница</div>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>
