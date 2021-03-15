<template>
  <div class="Result">
    <div class="summary">
      <span class="query">{{ presenter.query }}</span>
      の検索結果 {{ presenter.postSummaries.length }}件
    </div>
    <div class="PostList">
      <PostList :posts="presenter.postSummaries" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { usePresenter } from '@/hooks/usePresenter'
import PostList from '@/components/Modules/PostList'

export default defineComponent({
  name: 'Result',
  components: {
    PostList,
  },
  setup() {
    const { $resolver } = useContext()

    const presenter = usePresenter(() => {
      const postRepository = $resolver('PostRepository')
      const postSummaries = postRepository.getSearchResult()
      const query = postRepository.getSearchQuery()

      return {
        postSummaries,
        query,
      }
    })

    return {
      presenter,
    }
  },
})
</script>

<style scoped>
.Result {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 200px;
}

@media screen and (max-width: 768px) {
  .Result {
    width: 100%;
    padding-top: 24px;
  }
}

.summary {
  margin-bottom: 24px;
  padding: 0 24px;
  font-size: 16px;
  line-height: 40px;
  text-align: center;
  background: #fcfcfc;
  border: solid 1px #eee;
  border-radius: 20px;
  box-shadow: 2px 2px 40px -12px #999;
}

.query {
  margin-right: 0.2rem;
  color: #ef6530;
  font-weight: bold;
  font-size: 18px;
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
