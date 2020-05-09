<template>
  <div class="Home">
    <div class="PostList">
      <PostList :data="presenter.postList" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'
import { usePresenter, PresenterFn } from '@/hooks/usePresenter'

import Presenter, { IPresenter, ListType } from './presenter'
import PostRepository from '@/repositories/PostRepository'
import PostList from '@/components/Modules/PostList'

export default defineComponent({
  name: 'Home',
  components: {
    PostList
  },
  setup() {
    const presenterFn: PresenterFn<IPresenter> = store =>
      Presenter({
        postRepository: new PostRepository(store),
        listType: ListType.Latest
      })
    const presenter = usePresenter(presenterFn)

    return {
      presenter
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
