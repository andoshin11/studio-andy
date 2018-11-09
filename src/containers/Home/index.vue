<template>
  <div class="Home">
    <div class="PostList">
      <PostList :data="presenter.postList" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'

import Presenter, { IPresenter, ListType } from './presenter'

// Use Case
import FetchLatestPostsUseCase from '@/usecases/post/FetchLatestPostsUseCase'

// Repositories
import PostRepository from '@/repositories/PostRepository'

// Gateway
import ContentfulGateway from '@/gateway/ContentfulGateway'

// Service
import ErrorService from '@/services/ErrorService'

// components
import PostList from '@/components/Modules/PostList'

interface IData {
  listType: ListType
}

export default Vue.extend({
  components: {
    PostList
  },
  computed: {
    presenter(): IPresenter {
      return Presenter({
        postRepository: new PostRepository(store),
        listType: this.listType
      })
    }
  },
  data(): IData {
    return {
      listType: ListType.Latest
    }
  },
  methods: {
    async fetchLatestPosts() {
      const usecase = new FetchLatestPostsUseCase({
        postRepository: new PostRepository(store),
        errorService: new ErrorService({ context: 'Fetching Latest Posts' }),
        contentfulGateway: new ContentfulGateway()
      })
      await usecase.execute()
    },
    showLatest() {
      this.listType = ListType.Latest
    }
  },
  async mounted() {
    await this.fetchLatestPosts()
  }
})
</script>

<style scoped>
.Home {
  display: flex;
  flex-direction: column;
  padding-bottom: 200px;
}

.PostList {
  width: 1180px;
}
</style>
