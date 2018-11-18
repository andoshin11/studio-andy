<template>
  <div class="PostCard">
    <div 
      ref="header" 
      :style="headerStyle" 
      class="header">
      <img
        :src="post.props.headerImage.fields.file.url"
        alt=""
        class="img">
    </div>
    <div class="body">
      <div class="date">{{ publishedAt }}</div>
      <div class="title">{{ post.props.title }}</div>
      <div class="summary">{{ post.props.summary }}</div>
      <div class="tagList">
        <nuxt-link 
          v-for="tag in post.props.tags" 
          :key="tag" 
          :to="tagPath(tag)" 
          class="tag">{{ tag }}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import PostEntity from '@/entities/Post'

interface IData {
  clientWidth: number
}

export default Vue.extend({
  props: {
    post: {
      type: Object as () => PostEntity,
      required: true
    }
  },
  data(): IData {
    return {
      clientWidth: 0
    }
  },
  computed: {
    publishedAt(): string {
      if (this.post) {
        const publishedAt = dayjs(this.post.props.publishedAt)
        return publishedAt.format('M.D.YY')
      }
      return ''
    },
    headerStyle(): any {
      const posterHight = this.clientWidth / 2
      return {
        height: `${posterHight}px`
      }
    }
  },
  mounted() {
    if (!this.$refs.header) return
    const clientWidth = this.$refs.header.clientWidth
    this.clientWidth = clientWidth
  },
  methods: {
    tagPath(tag: string): string {
      if (tag) {
        return `/tags/${tag}`
      }
      return ''
    }
  }
})
</script>

<style scoped>
.PostCard {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: #222;
  border-radius: 8px;
  box-shadow: 0 8.09px 24.26px rgba(67, 54, 102, 0.08);
  transition: 0.3s ease-out;
}

@media screen and (max-width: 768px) {
  .PostCard {
    border-bottom: 1px solid #ddd;
    border-radius: 0;
    box-shadow: none;
  }
}

.PostCard:hover {
  box-shadow: 0 28.3px 88.94px rgba(67, 54, 102, 0.2);
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 300px;
  overflow: hidden;
}

.body {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 25px;
}

@media screen and (max-width: 768px) {
  .body {
    padding: 20px;
  }
}

.img {
  width: 100%;
  transition: 0.4s ease-out;
}

.PostCard:hover img {
  transform: scale(1.2);
}

@media screen and (max-width: 768px) {
  .PostCard:hover img {
    transform: none;
  }
}

.date {
  margin-bottom: 8px;
  color: #777;
  font-size: 12px;
  font-family: 'M PLUS 1p', sans-serif, Hiragino Kaku Gothic Pro, Meiryo,
    MS PGothic, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', Arial,
    'メイリオ';
  text-align: left;
}

.title {
  min-height: 54px;
  margin-bottom: 16px;
  font-weight: bold;
  font-size: 18px;
  text-align: left;
}

.summary {
  min-height: 64px;
  margin-bottom: 32px;
  color: #777;
  font-size: 14px;
  text-align: left;
}

.tagList {
  margin-bottom: 16px;
  text-align: left;
}

.tag {
  display: inline;
  margin-right: 4px;
  padding: 4px 8px;
  color: #222;
  font-size: 14px;
  border: solid 1px #5b3cc4;
  border-radius: 4px;
  transition: 0.15s;
}

.tag:hover {
  color: #fff;
  background: #5b3cc4;
}
</style>
