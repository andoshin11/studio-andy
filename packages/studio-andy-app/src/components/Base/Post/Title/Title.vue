<template>
  <h1 class="Title">
    <div 
      v-if="title.length < 1 " 
      class="empty">
      <Empty/>
    </div>
    {{ title }}
  </h1>
</template>

<script lang="ts">
import Vue from 'vue'
import Empty from '@/components/Base/Empty'

interface IData {}

export default Vue.extend({
  components: {
    Empty
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data(): IData {
    return {}
  }
})
</script>

<style scoped>
.Title {
  width: 90%;
  min-height: 48px;
  margin: 0 0 24px;
  font-weight: bold;
  font-size: 32px;
  line-height: 1.2;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .Title {
    width: 90%;
    margin-bottom: 16px;
    font-size: 24px;
    line-height: 1.3;
    text-align: left;
  }
}

.empty {
  width: 100%;
  height: 48px;
}

@media screen and (max-width: 768px) {
  .empty {
    height: 36px;
  }
}
</style>
