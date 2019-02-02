<template>
  <div class="HeaderImg">
    <template v-if="post">
      <picture>
        <source 
          :srcset="post.props.headerImageLight.fields.file.url" 
          class="img" 
          type="image/webp">
        <img
          :src="post.props.headerImage.fields.file.url"
          :alt="post.props.headerImage.fields.file.title"
          class="img"
        >
      </picture>
    </template>
    <div 
      v-else 
      class="empty">
      <Empty/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Asset } from 'contentful'
import Empty from '@/components/Base/Empty'
import PostEntity from '@/entities/Post'

interface IData {}

export default Vue.extend({
  components: {
    Empty
  },
  props: {
    post: {
      type: Object as () => PostEntity,
      default: null
    }
  },
  data(): IData {
    return {}
  }
})
</script>

<style scoped>
.HeaderImg {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 24px;
}

.img {
  width: 100%;
  max-height: 100%;
}

.empty {
  width: 100%;
  height: 620px;
}

@media screen and (max-width: 768px) {
  .empty {
    height: 196px;
  }
}
</style>
