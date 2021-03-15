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

const PostList = () => import('@/components/Modules/PostList')

export default defineComponent({
  name: 'Home',
  components: {
    PostList,
  },
  setup() {
    const { $resolver } = useContext()

    const presenter = usePresenter(() => {
      const postRepository = $resolver('PostRepository')
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
