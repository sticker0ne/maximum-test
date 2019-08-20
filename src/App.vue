<template>
  <div id="app">
    <div class="maximum-layout">
      <header class="maximum-header">
        <head-menu />
      </header>
      <div class="maximum-body">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import HeadMenu from './components/headMenu'
export default {
  name: 'App',
  components: { HeadMenu }
}
</script>
