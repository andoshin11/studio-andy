<template>
  <div class="PostList">
    <div 
      v-for="(row, i) in rows" 
      :key="i" 
      class="row">
      <nuxt-link 
        v-for="post in row" 
        :key="post.props.id" 
        :to="postPath(post)" 
        class="post">
        <PostCard :post="post"/>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PostCard from '@/components/Modules/PostCard'
import PostEntity from '@/entities/Post'
import { range } from '@/util/util'

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
  computed: {
    rows(): PostEntity[][] {
      const colNum = 2

      return Array.from(range(0, Math.ceil(this.data.length / colNum) - 1)).map(i => {
        const startIndex = i * colNum
        const endIndex = startIndex + colNum - 1
        const row = Array.from(range(startIndex, endIndex)).map(index => this.data[index])
        return row
      })
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
  width: 1180px;
}

@media screen and (max-width: 768px) {
  .PostList {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
}

.row {
  width: 1180px;
  height: 496px;
  text-align: left;
}

@media screen and (max-width: 768px) {
  .row {
    width: 100%;
    height: auto;
  }
}

.post {
  display: inline-block;
  box-sizing: border-box;
  width: 590px;
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
