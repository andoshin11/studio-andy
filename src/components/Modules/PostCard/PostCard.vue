<template>
  <div 
    class="PostCard" 
    @mouseenter="prerender">
    <div class="header">
      <picture>
        <source 
          :srcset="headerWebp" 
          class="img" 
          type="image/webp">
        <img 
          :src="headerImage" 
          :alt="post.props.title" 
          class="img">
      </picture>
    </div>
    <div class="body">
      <span class="date">{{ publishedAt }}</span>
      <div class="title">{{ post.props.title }}</div>
      <ul class="tagList">
        <li 
          v-for="tag in post.props.tags" 
          :key="tag" 
          class="tag">
          <nuxt-link :to="tagPath(tag)">{{ tag }}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import PostEntity from '@/entities/Post'
import { prerender } from '@/util/util'

export default Vue.extend({
  props: {
    post: {
      type: Object as () => PostEntity,
      required: true
    }
  },
  computed: {
    publishedAt(): string {
      if (this.post) {
        const publishedAt = dayjs(this.post.props.publishedAt)
        return publishedAt.format('MMM D, YYYY')
      }
      return ''
    },
    headerImage(): string {
      const { headerImage } = this.post.props
      return headerImage ? headerImage.fields.file.url : ''
    },
    headerWebp(): string {
      const { headerImageLight } = this.post.props
      return headerImageLight ? headerImageLight.fields.file.url : ''
    }
  },
  methods: {
    tagPath(tag: string): string {
      if (tag) {
        return `/tags/${tag}`
      }
      return ''
    },
    prerender() {
      const href = `/posts/${this.post.props.slug}`
      prerender(href)
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

@media screen and (max-width: 768px) {
  .PostCard {
    margin: 0 20px 40px;
  }
}

.PostCard:hover {
  box-shadow: 0 28.3px 88.94px rgba(67, 54, 102, 0.2);
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
  background-color: #fefefe;
}

@media screen and (max-width: 768px) {
  .body {
    padding: 16px;
  }
}

/* .body::before {
  content: '';
  display: block;
  padding-top: 33%;
} */

.img {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  transition: 0.4s ease-out;
}

@media screen and (min-width: 769px) {
  .PostCard:hover .img {
    transform: translate(-50%, -50%) scale(1.2);
  }
}

.date {
  /* position: absolute;
  top: 20px;
  left: 25px; */
  display: inline-block;
  margin-bottom: 8px;
  font-size: 12px;
  font-family: 'M PLUS 1p', sans-serif, Hiragino Kaku Gothic Pro, Meiryo, MS PGothic, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', Arial, 'メイリオ';
  text-align: left;
  transition: 0.4s ease-out;
}

@media screen and (min-width: 769px) {
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
  font-family: Hiragino Kaku Gothic Pro, 'M PLUS 1p', sans-serif, Meiryo, MS PGothic, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', Arial, 'メイリオ';
  letter-spacing: 0.5px;
  text-align: left;
  transition: 0.4s ease-out;
}

@media screen and (min-width: 769px) {
  .PostCard:hover .title {
    letter-spacing: 0.75px;
  }
}

.tagList {
  margin-bottom: 16px;
  text-align: left;
}

@media screen and (max-width: 768px) {
  .tagList {
    margin-bottom: 8px;
  }
}

.tag {
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .tag {
    font-size: 14px;
  }
}

.tag:not(:last-child):after {
  content: '/';
  margin: 0 8px;
  transition: 0.3s ease-out;
}

.tag a {
  color: #222;
  transition: 0.4s ease-out;
}

.tag:hover a,
.tag:focus a {
  text-decoration: underline;
}

@media screen and (min-width: 769px) {
  .PostCard:hover .tag a,
  .PostCard:hover .tag:not(:last-child):after {
    color: #ef6530;
    letter-spacing: 0.5px;
  }
}
</style>
