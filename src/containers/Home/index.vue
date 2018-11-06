<template>
  <div class="Home">
    <div class="Home__ArticleList">
      <ArticleCard />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ArticleCard from '../../components/Modules/ArticleCard.vue'

// Use Case

// Repositories

// Service

// components

export default Vue.extend({
  components: {
    ArticleCard
  },
  data() {
    return {}
  }
})
</script>

<style scoped>
.Home {
  display: flex;
  flex-direction: column;
}
</style>
