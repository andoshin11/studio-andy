<template>
  <div class="Home">
    <div class="PostList">
      <PostList :posts="presenter.posts" />
    </div>
  </div>
</template>

<script lang="ts">
import { container } from 'tsyringe'
import { defineComponent } from '@nuxtjs/composition-api'
import { usePresenter } from '@/hooks/usePresenter'

import PostList from '@/components/Modules/PostList'
import PostRepository from '@/interface/repository/PostRepository'

export default defineComponent({
  name: 'Home',
  components: {
    PostList
  },
  setup() {
    const presenter = usePresenter(() => {
      const postRepository = container.resolve<PostRepository>('PostRepository')
      const posts = postRepository.getPosts('publishedAt')

      return {
        posts
      }
    })

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
  padding-bottom: 0px;
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
