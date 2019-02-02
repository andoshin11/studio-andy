<template>
  <section class="container">
    <HomeContainer/>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
const HomeContainer = () => import('@/containers/Home/index.vue')

// Use Case
import FetchLatestPostsUseCase from '@/usecases/post/FetchLatestPostsUseCase'

// Repositories
import PostRepository from '@/repositories/PostRepository'

// Gateway
import ContentfulGateway from '@/gateway/ContentfulGateway'

// Service
import LogService from '@/services/LogService'

export default Vue.extend({
  components: {
    HomeContainer
  },
  head() {
    return {
      title: 'Home | Studio Andy',
      meta: [{ hid: 'description', name: 'description', content: "Welcome to Shin Ando's (you may know me as Andy!) personal blog. I'm excited to share some parts of my daily life to all of you, my fellas." }]
    }
  },
  async fetch({ store, $sentry }) {
    const usecase = new FetchLatestPostsUseCase({
      postRepository: new PostRepository(store),
      logService: new LogService({ logger: $sentry }),
      contentfulGateway: new ContentfulGateway()
    })
    await usecase.execute()
  }
})
</script>


<style scoped>
.container {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
}

@media screen and (max-width: 1024px) {
  .container {
    width: 100%;
  }
}
</style>
