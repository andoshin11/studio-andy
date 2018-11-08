<template>
  <section class="container">
    <HomeContainer />
  </section>
</template>

<script>
import HomeContainer from '@/containers/Home/index.vue'

export default {
  components: {
    HomeContainer
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>
