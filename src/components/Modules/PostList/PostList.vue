<template>
  <div class="PostList">
    <div 
      v-if="!data.length" 
      class="emptyText">該当する記事はありません</div>
    <nuxt-link 
      v-for="post in data" 
      :key="post.props.id" 
      :to="postPath(post)" 
      class="post">
      <PostCard :post="post"/>
    </nuxt-link>
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
        return `/posts/${post.props.slug}`
      }
      return ''
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
  }
}

.post {
  box-sizing: border-box;
  width: 50%;
  padding: 15px;
}

@media screen and (max-width: 768px) {
  .post {
    width: 100%;
    padding: 0;
  }
}

.emptyText {
  font-size: 16px;
  line-height: 100px;
}
</style>
