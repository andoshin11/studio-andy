<template>
  <div class="PostCard">
    <div class="header" ref="header" :style="headerStyle">
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
        <nuxt-link v-for="tag in post.props.tags" class="tag" :key="tag" :to="tagPath(tag)">{{ tag }}</nuxt-link>
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
  methods: {
    tagPath(tag: string): string {
      if (tag) {
        return `/tags/${tag}`
      }
      return ''
    }
  },
  mounted() {
    if (!this.$refs.header) return
    const clientWidth = this.$refs.header.clientWidth
    this.clientWidth = clientWidth
  }
})
</script>

<style scoped>
.PostCard {
  display: flex;
  flex-direction: column;
  color: #222;
  border-radius: 8px;
  box-shadow: 0 8.09px 24.26px rgba(67, 54, 102, 0.08);
  overflow: hidden;
  transition: 0.3s ease-out;
}

@media screen and (max-width: 768px) {
  .PostCard {
    border-radius: 0;
    box-shadow: none;
    border-bottom: 1px solid #ddd;
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
  display: flex;
  flex-direction: column;
  padding: 25px;
  position: relative;
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
  text-align: left;
  color: #777;
  font-size: 12px;
  margin-bottom: 8px;
  font-family: 'M PLUS 1p', sans-serif, Hiragino Kaku Gothic Pro, Meiryo,
    MS PGothic, sans-serif, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI',
    Arial, 'メイリオ', Meiryo;
}

.title {
  font-weight: bold;
  text-align: left;
  font-size: 18px;
  min-height: 54px;
  margin-bottom: 16px;
}

.summary {
  text-align: left;
  color: #777;
  font-size: 14px;
  min-height: 64px;
  margin-bottom: 32px;
}

.tagList {
  text-align: left;
  margin-bottom: 16px;
}

.tag {
  color: #222;
  border: solid 1px #5b3cc4;
  display: inline;
  margin-right: 4px;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: 0.15s;
}

.tag:hover {
  background: #5b3cc4;
  color: #fff;
}
</style>
