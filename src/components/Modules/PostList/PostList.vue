<template>
  <div class="PostList">
    <a v-for="post in data" :key="post.props.id" :href="postPath(post)" class="post">
      <PostCard :post="post" />
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PostCard from '@/components/Modules/PostCard'
import PostEntity from '@/entities/Post'

export default Vue.extend({
  components: {
    PostCard
  },
  props: {
    data: {
      type: Array as () => PostEntity[],
      required: true
    }
  },
  methods: {
    postPath(post: PostEntity): string {
      if (post) {
        return `/posts/${post.props.id}`
      }
      return ''
    }
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
