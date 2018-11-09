<template>
  <section class="container">
    <PostContainer :id="$route.params.id" />
  </section>
</template>

<script>
import PostContainer from '@/containers/Post/index.vue'

export default {
  components: {
    PostContainer
  }
}
</script>

<style>
.container {
  width: 1180px;
  margin: 0 auto;
}
</style>
