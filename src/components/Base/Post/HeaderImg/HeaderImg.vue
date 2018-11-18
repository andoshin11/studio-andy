<template>
  <div class="HeaderImg">
    <template v-if="headerImg">
      <img 
        :src="headerImg.fields.file.url" 
        :alt="headerImg.fields.title" 
        class="img">
      <div class="mask"/>
      <div class="date">Nov 9, 2018</div>
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
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
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

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.3;
}

.date {
  position: absolute;
  top: 60%;
  left: 0;
  background: #ef6530;
  color: #fdfdfd;
}
</style>
