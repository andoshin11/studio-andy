<template>
  <div class="SocialButtons">
    <a 
      :href="`http://b.hatena.ne.jp/entry/${pagePath}`"
      class="socialButton">
      <svg 
        width="20px"
        height="40px" 
        viewBox="0 0 141.732 141.732"
        enable-background="new 0 0 141.732 141.732">
        <use href="/hatena.svg#root" />
      </svg>
    </a>
    <a 
      :href="`http://twitter.com/share?url=${pagePath}&text=${post.toJson().title}`"
      class="socialButton"
      target="_blank">
      <svg 
        height="16"
        width="20"
        viewBox="0 0 20 16">
        <use href="/twitter.svg#root" />
      </svg>
    </a>
    <a 
      :href="`http://getpocket.com/edit?url=${pagePath}`"
      class="socialButton"
      target="_blank">
      <svg 
        width="20px"
        height="40px"
        viewBox="0 0 141.732 141.732"
        enable-background="new 0 0 141.732 141.732"
        xmlSpace="preserve">
        <use href="/pocket.svg#root" />
      </svg>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Post from '@/domain/Post'

export default defineComponent({
  name: 'SocialButtons',
  props: {
    pagePath: {
      type: String,
      required: true
    },
    post: {
      type: Object as () => Post,
      required: true
    }
  }
})
</script>

<style scoped>
.SocialButtons {
  width: 0;
  margin: 0;
}

@media screen and (max-width: 768px) {
  .SocialButtons {
    display: flex;
    width: auto;
    margin-bottom: 24px;
    padding-left: 24px;
  }
}

.socialButton {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 40px;
  height: 40px;
  margin-bottom: 15px;
  background: transparent;
  border: solid 1px #ddd;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s ease-out;
  -webkit-appearance: none;
  fill: #777;
}

@media screen and (max-width: 768px) {
  .socialButton {
    margin-right: 16px;
  }
}

.socialButton > svg {
  height: 40px;
}

.socialButton:hover,
.socialButton:focus {
  box-shadow: 0 8.09px 24.26px rgba(67, 54, 102, 0.08);
}
</style>
