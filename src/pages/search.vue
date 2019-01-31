<template>
  <section class="container">
    <ResultContainer/>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
const ResultContainer = () => import('@/containers/Result/index.vue')

// Use Case
import SearchPostsUseCase from '@/usecases/post/SearchPostsUseCase'

// Repositories
import PostRepository from '@/repositories/PostRepository'

// Gateway
import ContentfulGateway from '@/gateway/ContentfulGateway'

// Service
import LogService from '@/services/LogService'

export default Vue.extend({
  components: {
    ResultContainer
  },
  watchQuery: ['query'],
  async fetch({ query, store, $sentry }) {
    if (!query.query) return

    const usecase = new SearchPostsUseCase({
      contentfulGateway: new ContentfulGateway(),
      logService: new LogService({ logger: $sentry }),
      postRepository: new PostRepository(store)
    })

    await usecase.execute(Array.isArray(query.query) ? query.query[0] : query.query)
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
