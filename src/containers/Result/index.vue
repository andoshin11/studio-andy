<template>
  <div class="Result">
    <div class="PostList">
      <PostList :data="presenter.postList" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Presenter, { IPresenter } from './presenter'

// Repositories
import PostRepository from '@/repositories/PostRepository'

// components
import PostList from '@/components/Modules/PostList'

interface IData {}

export default Vue.extend({
  components: {
    PostList
  },
  data(): IData {
    return {}
  },
  computed: {
    presenter(): IPresenter {
      return Presenter({
        postRepository: new PostRepository(this.$store)
      })
    }
  }
})
</script>

<style scoped>
.Result {
  display: flex;
  flex-direction: column;
  padding-bottom: 200px;
}

@media screen and (max-width: 768px) {
  .Result {
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
