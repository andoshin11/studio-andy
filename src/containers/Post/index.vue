<template>
  <div class="Post">
    <div
      v-if="!presenter.post.props.isPublished"
      class="preview"
    >未公開の記事をPreview機能で閲覧中です。この記事はURLを知っているユーザーにしか表示されません。</div>
    <div class="inner">
      <div class="header">
        <HeaderImg :post="presenter.post"/>
        <PostDate :text="presenter.post ? presenter.post.props.publishedAt : ''"/>
        <PostTitle :title="presenter.post ? presenter.post.props.title : ''"/>
        <TagList :list="presenter.post ? presenter.post.props.tags : []"/>
      </div>
      <div class="body">
        <div 
          v-if="presenter.post" 
          class="socialLinks">
          <SocialButtons 
            :page-path="pagePath" 
            :post="presenter.post"/>
        </div>
        <div class="content">
          <Markdown :text="presenter.post ? presenter.post.props.content : ''"/>
        </div>
      </div>
    </div>
    <lazy-component 
      class="relatedPosts" 
      @show="fetchRelatedPosts">
      <template v-if="!presenter.relatedPosts.length">
        <!-- <Loading/> -->
      </template>
      <template v-else>
        <div class="relatedPostsLabel">関連する記事</div>
        <PostList :data="presenter.relatedPosts"/>
      </template>
    </lazy-component>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Presenter, { IPresenter } from './presenter'

// Use Case
import FetchPostUseCase from '@/usecases/post/FetchPostUseCase'

// Repositories
import PostRepository from '@/repositories/PostRepository'

// Entities
import PostEntity from '@/entities/Post'

// Gateway
import ContentfulGateway from '@/gateway/ContentfulGateway'

// Service
import ErrorService from '@/services/ErrorService'

// Containers

// omponents
const PostTitle = () => import('@/components/Base/Post/Title')
const PostDate = () => import('@/components/Base/Post/Date')
const TagList = () => import('@/components/Base/Post/TagList')
const HeaderImg = () => import('@/components/Base/Post/HeaderImg')
const Markdown = () => import('@/components/Base/Markdown')
const SocialButtons = () => import('@/components/Modules/SocialButtons')
const Loading = () => import('@/components/Base/Loading')
const PostList = () => import('@/components/Modules/PostList')

export default Vue.extend({
  components: {
    PostTitle,
    PostDate,
    TagList,
    HeaderImg,
    Markdown,
    Loading,
    SocialButtons,
    PostList
  },
  computed: {
    presenter(): IPresenter {
      return Presenter({
        postRepository: new PostRepository(this.$store)
      })
    },
    pagePath(): string {
      const base = 'http://blog.andoshin11.me'
      return base + this.$route.fullPath
    },
    isClient(): boolean {
      return typeof window !== undefined
    }
  },
  methods: {
    fetchRelatedPosts() {
      this.$emit('fetchRelatedPosts', this.presenter.post)
    }
  },
  head() {
    const post = this.presenter.post
    return {
      title: `${this.presenter.post ? this.presenter.post.props.title : ''} | Studio Andy`,
      meta: [
        { hid: 'description', name: 'description', content: post ? post.props.summary : '' },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:description', property: 'og:description', content: post ? post.props.summary : '' },
        { hid: 'og:title', property: 'og:title', content: post ? post.props.title : '' },
        { hid: 'og:image', property: 'og:image', content: post ? `https:${post.props.headerImage.fields.file.url}` : '' },
        { hid: 'og:url', property: 'og:url', content: `https://blog.andoshin11.me/posts/${post ? post.props.slug : ''}` }
      ]
    }
  }
})
</script>

<style scoped>
.Post {
  padding-top: 40px;
  padding-bottom: 100px;
  background: #fefefe;
}

@media screen and (max-width: 768px) {
  .Post {
    width: 100%;
    padding-top: 0;
    overflow: hidden;
  }
}

.preview {
  margin-top: -40px;
  padding: 40px 0;
  color: #fefefe;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  background: #ef6530;
}

@media screen and (max-width: 768px) {
  .preview {
    margin-top: 0;
    padding: 24px 16px;
    font-size: 16px;
  }
}

.inner {
  display: flex;
  flex-direction: column;
  width: 1180px;
  margin: 0 auto;
}

@media screen and (max-width: 768px) {
  .inner {
    width: 100%;
  }
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
}

.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
}

.socialLinks {
  position: sticky;
  top: 60px;
  z-index: 100;
  width: 100%;
  height: 0;
}

@media screen and (max-width: 768px) {
  .socialLinks {
    position: relative;
    top: auto;
    height: auto;
  }
}

.content {
  width: 60%;
}

@media screen and (max-width: 768px) {
  .content {
    width: 90%;
  }
}

.relatedPosts {
  width: 1180px;
  margin: 0 auto;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .relatedPosts {
    width: 100%;
  }
}

.relatedPostsLabel {
  margin-bottom: 40px;
  font-size: 18px;
}
</style>
