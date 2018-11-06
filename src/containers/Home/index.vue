<template>
  <div class="Home">
    <div class="Home__ArticleList">
      <ArticleCard />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ArticleCard from '../../components/Modules/ArticleCard.vue'

import Presenter, { IPresenter } from './presenter'

// Use Case

// Repositories

// Service

// components

interface IData {
  test: boolean
}

export default Vue.extend({
  components: {
    ArticleCard
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
}
</style>
