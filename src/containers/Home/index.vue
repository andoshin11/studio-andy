<template>
  <div class="Home">
    <div class="PostList">
      <PostList :data="presenter.postList"/>
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

// components
const PostList = () => import('@/components/Modules/PostList')

interface IData {
  listType: ListType
}

export default Vue.extend({
  components: {
    PostList
  },
  data(): IData {
    return {
      listType: ListType.Latest
    }
  },
  computed: {
    presenter(): IPresenter {
      return Presenter({
        postRepository: new PostRepository(this.$store),
        listType: this.listType
      })
    }
  },
  methods: {
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
    padding-top: 32px;
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
