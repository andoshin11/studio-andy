<template>
  <section class="container">
    <PostContainer :id="$route.params.id" />
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
import ErrorService from '@/services/ErrorService'

export default Vue.extend({
  components: {
    PostContainer
  },
  async fetch({ params, store }) {
    const usecase = new FetchPostUseCase({
      postRepository: new PostRepository(store),
      errorService: new ErrorService({ context: 'Fetching a Post' }),
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
