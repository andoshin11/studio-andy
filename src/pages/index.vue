<template>
  <section class="container">
    <HomeContainer />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import HomeContainer from '@/containers/Home/index.vue'

// Use Case
import FetchLatestPostsUseCase from '@/usecases/post/FetchLatestPostsUseCase'

// Repositories
import PostRepository from '@/repositories/PostRepository'

// Gateway
import ContentfulGateway from '@/gateway/ContentfulGateway'

// Service
import ErrorService from '@/services/ErrorService'

export default Vue.extend({
  components: {
    HomeContainer
  },
  async fetch({ store }) {
    const usecase = new FetchLatestPostsUseCase({
      postRepository: new PostRepository(store),
      errorService: new ErrorService({ context: 'Fetching Latest Posts' }),
      contentfulGateway: new ContentfulGateway()
    })
    await usecase.execute()
  }
})
</script>


<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  text-align: center;
}

@media screen and (max-width: 1024px) {
  .container {
    width: 100%;
  }
}
</style>
