<template>
  <div class="Post">
    <div class="header">
      <HeaderImg :header-img="presenter.post ? presenter.post.props.headerImage : null"/>
      <PostDate :text="presenter.post ? presenter.post.props.publishedAt : ''" />
      <PostTitle :title="presenter.post ? presenter.post.props.title : ''" />
      <TagList :list="presenter.post ? presenter.post.props.tags : []" />
    </div>
    <div class="body">
      <div class="socialLinks">
        <button class="socialButton">
          <svg 
            height="21" 
            width="10" 
            viewbox="0 0 10 21">
            <path d="M6.8 20.1v-9.9h2.7l.4-3.4H6.8V5.1c0-.9.1-1.4 1.4-1.4h1.7V.3H7.1C3.9.3 2.7 2 2.7 4.8v2h-2v3.4h2v9.9h4.1z" />
          </svg>
        </button>
        <button class="socialButton">
          <svg 
            height="16" 
            width="20" 
            viewbox="0 0 20 16">
            <path d="M9.4 4.3V5l-.7-.1C6.2 4.5 4 3.4 2.1 1.6L1.2.7l-.3.6c-.5 1.6-.2 3.2.9 4.2.6.6.4.7-.5.3-.4-.1-.7-.1-.7-.1-.1.1.2 1.4.5 1.9.4.7 1.1 1.4 1.9 1.8l.7.3h-.8c-.8 0-.8 0-.7.3.3.9 1.4 1.9 2.6 2.3l.9.3-.8.5c-1.1.7-2.4 1-3.7 1-.6 0-1.1.1-1.1.1 0 .1 1.7.9 2.7 1.2 3 .9 6.5.5 9.2-1 1.9-1.1 3.8-3.3 4.7-5.5.5-1.1 1-3.2 1-4.2 0-.7 0-.7.8-1.5.5-.5.9-.9 1-1.1.1-.3.1-.3-.6 0-1.2.4-1.4.4-.8-.3.4-.5 1-1.3 1-1.5 0 0-.2 0-.4.2-.3.1-.8.4-1.2.5l-.8.2-.7-.5c-.4-.3-.9-.5-1.2-.6-.7-.2-1.8-.2-2.4.1-2 .6-3.1 2.3-3 4.1z" />
          </svg>
        </button>
        <button class="socialButton">
          <svg 
            height="29" 
            width="29" 
            viewbox="0 0 29 29" 
            style="left:-0px;position: relative;">
            <path d="M19.385 4h-9.77A2.623 2.623 0 0 0 7 6.615V23.01a1.022 1.022 0 0 0 1.595.847l5.905-4.004 5.905 4.004A1.022 1.022 0 0 0 22 23.011V6.62A2.625 2.625 0 0 0 19.385 4zM21 23l-5.91-3.955-.148-.107a.751.751 0 0 0-.884 0l-.147.107L8 23V6.615C8 5.725 8.725 5 9.615 5h9.77C20.275 5 21 5.725 21 6.615V23z" />
          </svg>
        </button>
      </div>
      <div class="content">
        <Markdown :text="presenter.post ? presenter.post.props.content : ''"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Presenter, { IPresenter } from './presenter'

// Use Case
import FetchPostUseCase from '@/usecases/post/FetchPostUseCase'

// Repositories
import PostRepository from '@/repositories/PostRepository'

// Gateway
import ContentfulGateway from '@/gateway/ContentfulGateway'

// Service
import ErrorService from '@/services/ErrorService'

// components
import PostTitle from '@/components/Base/Post/Title'
import PostDate from '@/components/Base/Post/Date'
import TagList from '@/components/Base/Post/TagList'
import HeaderImg from '@/components/Base/Post/HeaderImg'
import Markdown from '@/components/Base/Markdown'

export default Vue.extend({
  components: {
    PostTitle,
    PostDate,
    TagList,
    HeaderImg,
    Markdown
  },
  computed: {
    presenter(): IPresenter {
      return Presenter({
        postRepository: new PostRepository(this.$store)
      })
    }
  }
})
</script>

<style scoped>
.Post {
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
}

@media screen and (max-width: 768px) {
  .Post {
    width: 100%;
    overflow: hidden;
  }
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.socialLinks {
  position: sticky;
  top: 30px;
  z-index: 100;
  width: 100%;
  height: 0;
}

@media screen and (max-width: 768px) {
  .socialLinks {
    display: none;
  }
}

.socialButton {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 40px;
  height: 40px;
  margin-bottom: 15px;
  background: trans;
  border: 1px solid #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s ease-out;
  -webkit-appearance: none;
  fill: #777;
  -webkit-box-align: center;
}

.socialButton:hover,
.socialButton:focus {
  background: #5b3cc4;
  border: 1px solid #5b3cc4;
  fill: #fff;
}

.content {
  width: 60%;
}

@media screen and (max-width: 768px) {
  .content {
    width: 90%;
  }
}
</style>
