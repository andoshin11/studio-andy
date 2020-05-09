<template>
  <div class="HeaderImg">
    <picture v-if="post">
      <source 
        :srcset="post.props.headerImageLight.fields.file.url" 
        class="img" 
        type="image/webp" >
      <img 
        :src="post.props.headerImage.fields.file.url" 
        :alt="post.props.headerImage.fields.file.fileName" 
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
import { defineComponent } from 'nuxt-composition-api'
import Empty from '@/components/Base/Empty'
import PostEntity from '@/entities/Post'

export default defineComponent({
  name: 'HeaderImg',
  components: {
    Empty
  },
  props: {
    post: {
      type: Object as () => PostEntity | null,
      default: null
    }
  }
  // setup(props) {
  //   const { post } = props
  //   return {
  //     post
  //   }
  // }
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
