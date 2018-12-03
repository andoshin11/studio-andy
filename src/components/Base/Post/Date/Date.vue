<template>
  <div class="Date">
    <div 
      v-if="text.length < 1 " 
      class="empty">
      <Empty/>
    </div>
    {{ date }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import Empty from '@/components/Base/Empty'

export default Vue.extend({
  components: {
    Empty
  },
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    date(): string {
      if (this.text.length > 1) {
        return dayjs(this.text).format('MMM D, YYYY')
      }
      return ''
    }
  }
})
</script>

<style scoped>
.Date {
  width: 90%;
  margin-bottom: 24px;
  color: #222;
  font-size: 18px;
  font-style: italic;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .Date {
    margin-bottom: 8px;
    font-size: 14px;
    text-align: left;
  }
}

.empty {
  width: 64px;
  height: 27px;
}

@media screen and (max-width: 768px) {
  .empty {
    height: 21px;
  }
}
</style>
