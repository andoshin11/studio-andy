<template>
  <div class="PostList">
    <a href="/posts/2" class="post">
      <PostCard />
    </a>
    <a href="/posts/2" class="post">
      <PostCard />
    </a>
    <a href="/posts/2" class="post">
      <PostCard />
    </a>
    <a href="/posts/2" class="post">
      <PostCard />
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PostCard from '@/components/Modules/PostCard'

export default Vue.extend({
  components: {
    PostCard
  }
})
</script>

<style scoped>
.PostList {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.post {
  box-sizing: border-box;
  width: 50%;
  padding: 15px;
}
</style>
