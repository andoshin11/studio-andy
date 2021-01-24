<template>
  <div class="Post">
    <div 
      v-if="presenter.post && !presenter.post.toJson().isPublished"
      class="preview">
      未公開の記事をPreview機能で閲覧中です。この記事はURLを知っているユーザーにしか表示されません。
    </div>
    <div class="inner">
      <div class="header">
        <HeaderImg :post="presenter.post" />
        <PostDate :text="presenter.post ? presenter.post.publishedAtStr : ''" />
        <PostTitle :title="presenter.post ? presenter.post.toJson().title : ''" />
        <TagList :list="presenter.post ? presenter.post.toJson().tags : []" />
      </div>
      <div class="body">
        <div 
          v-if="presenter.post" 
          class="socialLinks">
          <SocialButtons 
            :page-path="pagePath" 
            :post="presenter.post" />
        </div>
        <div class="content">
          <Markdown :text="presenter.post ? presenter.post.toJson().content : ''" />
        </div>
      </div>
    </div>
    <!-- <lazy-component
      class="relatedPosts"
      @show="fetchRelatedPosts">
      <Loading v-if="!presenter.relatedPosts.length" />
      <template v-else>
        <div class="relatedPostsLabel">関連する記事</div>
        <PostList :data="presenter.relatedPosts" />
      </template>
    </lazy-component> -->
  </div>
</template>

<script lang="ts">
import { container } from 'tsyringe'
import { defineComponent, computed, useContext, useMeta } from '@nuxtjs/composition-api'

import { usePresenter } from '@/hooks/usePresenter'
import PostRepository from '@/interface/repository/PostRepository'

import PostTitle from '@/components/Base/Post/Title'
import PostDate from '@/components/Base/Post/Date'
import TagList from '@/components/Base/Post/TagList'
import HeaderImg from '@/components/Base/Post/HeaderImg'
import Markdown from '@/components/Base/Markdown'
import SocialButtons from '@/components/Modules/SocialButtons'
import Loading from '@/components/Base/Loading'
import PostList from '@/components/Modules/PostList'

export default defineComponent({
  components: {
    PostTitle,
    PostDate,
    TagList,
    HeaderImg,
    Markdown,
    SocialButtons,
    Loading,
    PostList
  },
  head: {},
  name: 'Post',
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { route } = useContext()

    const presenter = usePresenter(() => {
      const postRepository = container.resolve<PostRepository>('PostRepository')
      const post = postRepository.getPost(props.slug)

      return {
        post
      }
    })

    // Comptuted
    const pagePath = computed(() => {
      const base = 'https://blog.andoshin11.me'
      return base + route.value.fullPath
    })

    useMeta(() => {
      const { post } = presenter.value

      return {
        title: `${post ? post.toJson().title : ''} | Studio Andy`,
        meta: [
          { hid: 'description', name: 'description', content: post ? post.toJson().summary : '' },
          { hid: 'og:type', property: 'og:type', content: 'article' },
          { hid: 'og:description', property: 'og:description', content: post ? post.toJson().summary : '' },
          { hid: 'og:title', property: 'og:title', content: post ? post.toJson().title : '' },
          { hid: 'og:image', property: 'og:image', content: post ? `https:${post.headerImageURL}` : '' },
          { hid: 'og:url', property: 'og:url', content: `https://blog.andoshin11.me/posts/${post ? post.toJson().slug : ''}` }
        ]
      }
    })

    return {
      presenter,
      pagePath
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
