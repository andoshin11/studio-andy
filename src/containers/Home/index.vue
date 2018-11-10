<template>
  <div class="Home">
    <div class="PostList">
      <PostList :data="presenter.postList" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

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
        postRepository: new PostRepository(this.$store),
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
        postRepository: new PostRepository(this.$store),
        errorService: new ErrorService({ context: 'Fetching Latest Posts' }),
        contentfulGateway: new ContentfulGateway()
      })
      await usecase.execute()
    },
    showLatest() {
      this.listType = ListType.Latest
    }
  }
})
</script>

<style scoped>
.Home {
  display: flex;
  flex-direction: column;
  padding-bottom: 200px;
}

@media screen and (max-width: 768px) {
  .Home {
    width: 100%;
  }
}

.PostList {
  width: 1180px;
}

@media screen and (max-width: 768px) {
  .PostList {
    width: 100%;
  }
}
</style>
