<template>
  <div class="Result">
    <div class="summary">
      <span class="query">{{ presenter.query }}</span>
      の検索結果 {{ presenter.postList.length }}件
    </div>
    <div class="PostList">
      <PostList :data="presenter.postList"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Presenter, { IPresenter } from './presenter'

// Repositories
import PostRepository from '@/repositories/PostRepository'

// components
const PostList = () => import('@/components/Modules/PostList')

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
