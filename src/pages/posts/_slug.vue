<template>
  <section :class="$style.container">
    <PostContainer @fetchRelatedPosts="fetchRelatedPosts"/>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
const PostContainer = () => import('@/containers/Post')
import PostEntity from '@/entities/Post'

// Use Case
import FetchPostUseCase from '@/usecases/post/FetchPostUseCase'
import FetchRelatedPostsUseCase from '@/usecases/post/FetchRelatedPostsUseCase'

// Repositories
import PostRepository from '@/repositories/PostRepository'

// Gateway
import ContentfulGateway from '@/gateway/ContentfulGateway'

// Service
import LogService from '@/services/LogService'

// Error
import { NotFoundError, ErrorType } from '@/common/errors'

export default Vue.extend({
  components: {
    PostContainer
  },
  methods: {
    async fetchRelatedPosts(post: PostEntity) {
      const usecase = new FetchRelatedPostsUseCase({
        logService: new LogService({
          logger: (this as any).logger //FIXME
        }),
        postRepository: new PostRepository(this.$store),
        contentfulGateway: new ContentfulGateway()
      })

      await usecase.execute(post)
    }
  },
  async asyncData({ $sentry }) {
    return {
      logger: $sentry
    }
  },
  async fetch({ params, store, $sentry, error }) {
    try {
      const usecase = new FetchPostUseCase({
        postRepository: new PostRepository(store),
        logService: new LogService({ logger: $sentry }),
        contentfulGateway: new ContentfulGateway()
      })
      await usecase.execute(params.slug)
    } catch (e) {
      if (e.type === ErrorType.NOT_FOUND) {
        error({ statusCode: 404, message: e.message })
        return
      }
      throw e
    }
  }
})
</script>


<style module>
.container {
  width: 100%;
  min-height: 100vh;
}
</style>
