<template>
  <section class="container">
    <HomeContainer />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import HomeContainer from '@/containers/Home/index.vue'

// Use Case
import FetchPostsByTagUseCase from '@/usecases/post/FetchPostsByTagUseCase'

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
  async fetch({ params, store }) {
    const usecase = new FetchPostsByTagUseCase({
      postRepository: new PostRepository(store),
      errorService: new ErrorService({ context: 'Fetching posts by tag' }),
      contentfulGateway: new ContentfulGateway()
    })
    await usecase.execute(params.id)
  }
})
</script>


<style>
.container {
  width: 1180px;
  margin: 0 auto;
}

@media screen and (max-width: 768px) {
  .container {
    width: 100%;
  }
}
</style>
