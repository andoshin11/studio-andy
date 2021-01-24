<template>
  <div class="HeaderImg">
    <picture v-if="post">
      <source 
        :srcset="post.headerImageLightURL"
        class="img" 
        type="image/webp" >
      <img 
        :src="post.headerImageLightURL"
        :alt="post.headerImageLightFileName"
        class="img" >
    </picture>
    <div 
      v-else 
      class="empty">
      <Empty />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Post from '@/domain/Post'
import Empty from '@/components/Base/Empty'

export default defineComponent({
  name: 'HeaderImg',
  components: {
    Empty
  },
  props: {
    post: {
      type: Object as () => Post | null,
      default: null
    }
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
