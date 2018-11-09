<template>
  <div class="Post">
    <div class="header">
      <PostTitle :title="presenter.post ? presenter.post.props.title : ''" />
      <PostDate :text="presenter.post ? presenter.post.props.publishedAt : ''" />
      <TagList :list="presenter.post ? presenter.post.props.tags : []" />
      <HeaderImg :headerImg="presenter.post ? presenter.post.props.headerImage : null"/>
    </div>
    <div class="body">
      <div class="socialLinks">
        <button class="socialButton">
          <svg height="21" width="10" viewbox="0 0 10 21">
            <path d="M6.8 20.1v-9.9h2.7l.4-3.4H6.8V5.1c0-.9.1-1.4 1.4-1.4h1.7V.3H7.1C3.9.3 2.7 2 2.7 4.8v2h-2v3.4h2v9.9h4.1z" />
          </svg>
        </button>
        <button class="socialButton">
          <svg height="16" width="20" viewbox="0 0 20 16">
            <path d="M9.4 4.3V5l-.7-.1C6.2 4.5 4 3.4 2.1 1.6L1.2.7l-.3.6c-.5 1.6-.2 3.2.9 4.2.6.6.4.7-.5.3-.4-.1-.7-.1-.7-.1-.1.1.2 1.4.5 1.9.4.7 1.1 1.4 1.9 1.8l.7.3h-.8c-.8 0-.8 0-.7.3.3.9 1.4 1.9 2.6 2.3l.9.3-.8.5c-1.1.7-2.4 1-3.7 1-.6 0-1.1.1-1.1.1 0 .1 1.7.9 2.7 1.2 3 .9 6.5.5 9.2-1 1.9-1.1 3.8-3.3 4.7-5.5.5-1.1 1-3.2 1-4.2 0-.7 0-.7.8-1.5.5-.5.9-.9 1-1.1.1-.3.1-.3-.6 0-1.2.4-1.4.4-.8-.3.4-.5 1-1.3 1-1.5 0 0-.2 0-.4.2-.3.1-.8.4-1.2.5l-.8.2-.7-.5c-.4-.3-.9-.5-1.2-.6-.7-.2-1.8-.2-2.4.1-2 .6-3.1 2.3-3 4.1z" />
          </svg>
        </button>
        <button class="socialButton">
          <svg height="29" width="29" viewbox="0 0 29 29" style="left:-0px;position: relative;">
            <path d="M19.385 4h-9.77A2.623 2.623 0 0 0 7 6.615V23.01a1.022 1.022 0 0 0 1.595.847l5.905-4.004 5.905 4.004A1.022 1.022 0 0 0 22 23.011V6.62A2.625 2.625 0 0 0 19.385 4zM21 23l-5.91-3.955-.148-.107a.751.751 0 0 0-.884 0l-.147.107L8 23V6.615C8 5.725 8.725 5 9.615 5h9.77C20.275 5 21 5.725 21 6.615V23z" />
          </svg>
        </button>
      </div>
      <div class="content">
        <PostBody v-if="presenter.post" :text="presenter.post.props.content" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'

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
import PostBody from '@/components/Base/Post/Body'

interface IData {}

export default Vue.extend({
  components: {
    PostBody,
    PostTitle,
    PostDate,
    TagList,
    HeaderImg
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    presenter(): IPresenter {
      return Presenter({
        postRepository: new PostRepository(store),
        id: this.id
      })
    }
  },
  data(): IData {
    return {}
  },
  methods: {
    async fetchPost() {
      const usecase = new FetchPostUseCase({
        postRepository: new PostRepository(store),
        errorService: new ErrorService({ context: 'Fetching a Post' }),
        contentfulGateway: new ContentfulGateway()
      })
      await usecase.execute(this.id)
    }
  },
  async mounted() {
    await this.fetchPost()
  }
})
</script>

<style scoped>
.Post {
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 45px;
  min-height: 840px;
}

.body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.socialLinks {
  width: 100%;
  height: 0;
  position: sticky;
  top: 30px;
  z-index: 100;
}

.socialButton {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  fill: #777;
  border: 1px solid #d9d9d9;
  background: trans;
  -webkit-appearance: none;
  margin-bottom: 15px;
  -webkit-box-align: center;
  cursor: pointer;
  transition: 0.3s ease-out;
}

.socialButton:hover,
.socialButton:focus {
  background: #5b3cc4;
  border: 1px solid #5b3cc4;
  fill: #fff;
}
</style>
