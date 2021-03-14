<template>
  <div class="Home">
    <div class="PostList">
      <PostList :posts="presenter.postSummaries" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { usePresenter } from '@/hooks/usePresenter'
import PostRepository from '@/interface/repository/PostRepository'

const PostList = () => import('@/components/Modules/PostList')

export default defineComponent({
  name: 'Home',
  components: {
    PostList,
  },
  setup() {
    const { $container } = useContext()

    const presenter = usePresenter(() => {
      const postRepository = $container.resolve<PostRepository>('PostRepository')
      const postSummaries = postRepository.getPostSummaries('publishedAt', true)

      return {
        postSummaries,
      }
    })

    return {
      presenter,
    }
  },
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
