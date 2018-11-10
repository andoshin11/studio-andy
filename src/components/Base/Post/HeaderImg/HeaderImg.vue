<template>
  <div class="HeaderImg">
    <img v-if="headerImg" class="img" :src="headerImg.fields.file.url" :alt="headerImg.fields.title">
    <div v-else class="empty">
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
  display: flex;
  align-items: center;
  width: 100%;
  height: 620px;
}

@media screen and (max-width: 768px) {
  .HeaderImg {
    height: 196px;
  }
}

.img {
  width: 100%;
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
