<template>
  <section class="container">
    <ResultContainer />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import ResultContainer from '@/containers/Result/index.vue'

// Use Case
import SearchPostsUseCase from '@/usecases/post/SearchPostsUseCase'

// Repositories
import PostRepository from '@/repositories/PostRepository'

// Gateway
import ContentfulGateway from '@/gateway/ContentfulGateway'

// Service
import ErrorService from '@/services/ErrorService'

export default Vue.extend({
  components: {
    ResultContainer
  },
  async fetch({ query, store }) {
    if (!query.query) return

    const usecase = new SearchPostsUseCase({
      contentfulGateway: new ContentfulGateway(),
      errorService: new ErrorService({ context: 'Searching posts' }),
      postRepository: new PostRepository(store)
    })

    await usecase.execute(query.query)
  }
})
</script>


<style scoped>
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
