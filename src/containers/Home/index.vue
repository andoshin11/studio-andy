<template>
  <div class="Home">
    <div class="PostList">
      <PostList />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Presenter, { IPresenter } from './presenter'

// Use Case

// Repositories

// Service

// components
import PostList from '@/components/Modules/PostList'

interface IData {
  test: boolean
}

export default Vue.extend({
  components: {
    PostList
  },
  data(): IData {
    return {
      test: false
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

.PostList {
  width: 1180px;
}
</style>
