<template>
  <div class="HeaderImg">
    <template v-if="headerImg">
      <img 
        :src="headerImg.fields.file.url" 
        :alt="headerImg.fields.title" 
        class="img">
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

interface IData {}

export default Vue.extend({
  components: {
    Empty
  },
  props: {
    headerImg: {
      type: Object as () => Asset,
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
  min-height: calc(100vw / 16 * 9);
  margin-bottom: 16px;
  border-bottom: solid 1px #ccc;
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
