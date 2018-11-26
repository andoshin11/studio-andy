<template>
  <section class="Post">
    <PostContainer :id="$route.params.id"/>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import PostContainer from '@/containers/Post/index.vue'

// Use Case
import FetchPostUseCase from '@/usecases/post/FetchPostUseCase'

// Repositories
import PostRepository from '@/repositories/PostRepository'

// Gateway
import ContentfulGateway from '@/gateway/ContentfulGateway'

// Service
import LogService from '@/services/LogService'

export default Vue.extend({
  components: {
    PostContainer
  },
  head() {
    return {
      script: [
        {
          src: '//cdn.embedly.com/widgets/platform.js',
          async: true
        }
      ]
    }
  },
  async fetch(ctx) {
    const { params, store, $sentry } = ctx
    const usecase = new FetchPostUseCase({
      postRepository: new PostRepository(store),
      logService: new LogService({ logger: $sentry }),
      contentfulGateway: new ContentfulGateway()
    })
    await usecase.execute(params.id)
  }
})
</script>


<style scoped>
.Post {
  width: 100%;
}
</style>
