<template>
  <div class="App">
    <div class="App__Header">
      <HeaderContainer />
    </div>
    <nuxt/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeaderContainer from '@/containers/Header/index.vue'

export default Vue.extend({
  components: {
    HeaderContainer
  }
})
</script>

<style>
</style>
