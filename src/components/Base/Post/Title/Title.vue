<template>
  <h1 class="Title">
    <div v-if="title.length < 1 " class="empty">
      <Empty />
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
  width: 80%;
  line-height: 1.2;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  margin: 0 0 24px;
  min-height: 48px;
}

@media screen and (max-width: 768px) {
  .Title {
    font-size: 28px;
    width: 90%;
    margin-bottom: 16px;
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
