<template>
  <div class="Wrapper">
    <div class="PostList">
      <nuxt-link 
        v-for="(post, index) in data" 
        v-show="isVisible(index)"
        :key="post.props.slug" 
        :to="postPath(post)" 
        :class="{ hidden: !isVisible(index) }"
        class="post">
        <PostCard :post="post" />
      </nuxt-link>
    </div>
    <button 
      v-if="!isLastPage" 
      class="showMore" 
      @click="loadNextPage">
      <svg 
        class="showMoreIcon" 
        focusable="false" 
        xmlns="http://www.w3.org/2000/svg" 
        viewbox="0 0 24 24">
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
      </svg>
      <span>もっと見る</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'nuxt-composition-api'
import PostEntity from '@/entities/Post'
import PostCard from '@/components/Modules/PostCard'

const PER_PAGE = 4

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
  setup(props) {
    const { data } = props

    // Data
    const page = ref(1)

    // Computed
    const isLastPage = computed(() => {
      return page.value * PER_PAGE >= data.length
    })

    // Methods
    const postPath = (post: PostEntity) => `/posts/${post.props.slug}`
    const loadNextPage = (state: any) => {
      if (isLastPage.value) return
      page.value = page.value + 1
    }
    const isVisible = (index: number) => index + 1 <= page.value * PER_PAGE

    return {
      postPath,
      loadNextPage,
      isLastPage,
      isVisible
    }
  }
})
</script>

<style scoped>
.Wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

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
  opacity: 1;
  transition: 0.3s ease;
  animation-name: fade-in;
  animation-duration: 0.5s;
}

.post.hidden {
  opacity: 0;
}

@media screen and (max-width: 768px) {
  .post {
    display: block;
    width: 100%;
    padding: 0;
  }
}

.showMore {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 240px;
  height: 42px;
  margin: 64px 0;
  padding: 0 24px;
  font-size: 16px;
  text-align: center;
  background: #fcfcfc;
  border: solid 1px #eee;
  border-radius: 20px;
  box-shadow: 2px 2px 40px -12px #999;
  cursor: pointer;
  transition: 0.3s ease-out;
}

.showMore:hover {
  box-shadow: 0 28.3px 88.94px rgba(67, 54, 102, 0.2);
}

.showMoreIcon {
  width: 24px;
  height: 24px;
}

@keyframes fade-in {
  0% {
    display: none;
    opacity: 0;
  }

  1% {
    display: block;
    opacity: 0;
  }

  100% {
    display: block;
    opacity: 1;
  }
}
</style>
