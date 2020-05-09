<template>
  <div class="PostList">
    <nuxt-link 
      v-for="post in data" 
      :key="post.props.slug" 
      :to="postPath(post)" 
      class="post">
      <PostCard :post="post" />
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'
import PostEntity from '@/entities/Post'
import PostCard from '@/components/Modules/PostCard'

export default defineComponent({
  name: 'PostList',
  components: {
    PostCard
  },
  props: {
    data: {
      type: Array as () => PostEntity[],
      required: true as true
    }
  },
  setup() {
    const postPath = (post: PostEntity) => `/posts/${post.props.slug}`

    return {
      postPath
    }
  }
})
</script>

<style scoped>
.PostList {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
@media screen and (max-width: 768px) {
  .PostList {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
}
.post {
  box-sizing: border-box;
  width: 50%;
  padding: 15px;
}
@media screen and (max-width: 768px) {
  .post {
    display: block;
    width: 100%;
    padding: 0;
  }
}
</style>
