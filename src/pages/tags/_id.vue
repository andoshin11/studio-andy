<template>
  <section :class="$style.container">
    <TagsContainer/>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
const TagsContainer = () => import('@/containers/Tags')

// Use Case
import FetchPostsByTagUseCase from '@/usecases/post/FetchPostsByTagUseCase'

// Repositories
import PostRepository from '@/repositories/PostRepository'

// Gateway
import ContentfulGateway from '@/gateway/ContentfulGateway'

// Service
import LogService from '@/services/LogService'

export default Vue.extend({
  components: {
    TagsContainer
  },
  async fetch({ params, store, $sentry }) {
    const usecase = new FetchPostsByTagUseCase({
      postRepository: new PostRepository(store),
      logService: new LogService({ logger: $sentry }),
      contentfulGateway: new ContentfulGateway()
    })
    await usecase.execute(params.id)
  }
})
</script>

<style module>
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
