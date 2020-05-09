<template>
  <section :class="$style.container">
    <PostContainer @fetchRelatedPosts="fetchRelatedPosts"/>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { defineComponent, getCurrentInstance, useContext } from 'nuxt-composition-api'
import { Context } from '@nuxt/types'

const PostContainer = () => import('@/containers/Post')
import PostEntity from '@/entities/Post'

// Use Case
import FetchPostUseCase from '@/usecases/post/FetchPostUseCase'
import FetchRelatedPostsUseCase from '@/usecases/post/FetchRelatedPostsUseCase'
import FetchLatestPostsUseCase from '@/usecases/post/FetchLatestPostsUseCase'

// Repositories
import PostRepository from '@/repositories/PostRepository'

// Gateway
import ContentfulGateway from '@/gateway/ContentfulGateway'

// Service
import LogService from '@/services/LogService'

// Error
import { NotFoundError, ErrorType } from '@/common/errors'

export default defineComponent({
  components: {
    PostContainer
  },
  setup() {
    const vm = getCurrentInstance()
    if (!vm) throw new Error('could not retrieve vm')
    const { $store } = vm
    const { store, $sentry } = useContext()

    const fetchRelatedPosts = async (post: PostEntity) => {
      const fetchRelatedPostsUseCase = new FetchRelatedPostsUseCase({
        logService: new LogService({
          logger: $sentry
        }),
        postRepository: new PostRepository(store),
        contentfulGateway: new ContentfulGateway()
      })
      const fetchLatestPostsUseCase = new FetchLatestPostsUseCase({
        logService: new LogService({
          logger: $sentry
        }),
        postRepository: new PostRepository(store),
        contentfulGateway: new ContentfulGateway()
      })

      await Promise.all([fetchLatestPostsUseCase.execute(), fetchRelatedPostsUseCase.execute(post)])
    }

    return {
      fetchRelatedPosts
    }
  },
  async middleware(ctx: Context) {
    const { params, store, $sentry, error } = ctx
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
