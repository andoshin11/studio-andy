<template>
  <div
    ref="rootRef"
    class="PostCard" 
    @mouseenter="prerender">
    <div class="header">
      <Empty 
        v-if="!isImageReady" 
        :aria-label="post.toJson().title"
        class="img"/>
      <picture v-else>
        <source 
          :srcset="post.headerImageLightURL"
          class="img" 
          type="image/webp" >
        <img 
          :src="post.headerImageURL"
          :alt="post.toJson().title"
          loading="lazy"
          class="img" >
      </picture>
    </div>
    <div class="body">
      <span class="date">{{ post.publishedAtStr }}</span>
      <div class="title">{{ post.toJson().title }}</div>
      <ul class="tagList">
        <li 
          v-for="(tag, i) in post.toJson().tags"
          :key="i" 
          class="tag">
          <nuxt-link 
            :to="tagPath(tag)" 
            tag="button">
            {{ tag }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'
import Post from '@/domain/Post'
import { prerender as _prerender } from '@/util/util'
import Empty from '@/components/Base/Empty'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export default defineComponent({
  name: 'PostCard',
  props: {
    post: {
      type: Object as () => Post,
      required: true
    }
  },
  components: {
    Empty
  },
  setup(props) {
    const { post } = props

    const isImageReady = ref(false)
    const rootRef = ref<HTMLElement | null>(null)

    // Methods
    const tagPath = (tag: string) => `/tags/${tag}`
    const prerender = () => {
      const href = `/posts/${post.toJson().slug}`
      _prerender(href)
    }
    const handleObservability = () => {
      try {
        useIntersectionObserver(rootRef, entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              isImageReady.value = true
              return
            }
          })
        })
      } catch (e) {
        isImageReady.value = true
        return
      }
    }

    // Lifecycle
    onMounted(() => {
      handleObservability()
    })

    return {
      tagPath,
      prerender,
      isImageReady,
      rootRef
    }
  }
})
</script>

<style scoped>
.PostCard {
  overflow: hidden;
  color: #222;
  border-radius: 16px;
  box-shadow: 2px 2px 40px -12px #999;
  transition: 0.3s ease-out;
}

.PostCard:hover {
  box-shadow: 0 28.3px 88.94px rgba(67, 54, 102, 0.2);
}

@media screen and (max-width: 768px) {
  .PostCard {
    margin: 0 20px 40px;
  }
}

.header {
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: #fefefe;
  border-radius: 16px 16px 0 0;
}

.header::before {
  content: '';
  display: block;
  padding-top: 50%;
}

.body {
  box-sizing: border-box;
  width: 100%;
  padding: 20px 25px;
  text-align: left;
  background-color: #fefefe;
}

@media screen and (max-width: 768px) {
  .body {
    padding: 16px;
  }
}

.img {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  transition: 0.4s ease-out;
}

@media screen and (max-width: 768px) {
  .PostCard:hover .img {
    transform: translate(-50%, -50%) scale(1.2);
  }
}

.date {
  display: inline-block;
  margin-bottom: 8px;
  font-size: 12px;
  transition: 0.4s ease-out;
}

@media screen and (max-width: 768px) {
  .PostCard:hover .date {
    letter-spacing: 0.5px;
  }
}

.title {
  width: 100%;
  min-height: 72px;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 24px;
  letter-spacing: 0.5px;
  transition: 0.4s ease-out;
}

@media screen and (max-width: 768px) {
  .PostCard:hover .title {
    letter-spacing: 0.75px;
  }
}

.tagList {
  width: 100%;
  margin-bottom: 16px;
  text-align: left;
}

@media screen and (max-width: 768px) {
  .tagList {
    margin-bottom: 8px;
  }
}

.tag {
  display: inline;
}

.tag:not(:last-child):after {
  content: '/';
  margin: 0 4px;
  transition: 0.3s ease-out;
}

.tag button {
  display: inline-block;
  font-size: 14px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: 0.4s ease-out;
  -webkit-appearance: none;
}

.tag:hover button,
.tag:focus button {
  color: #ef6530;
  text-decoration: underline;
}

@media screen and (max-width: 768px) {
  .tag:hover button,
  .tag:focus button {
    letter-spacing: 0.5px;
  }
}
</style>
