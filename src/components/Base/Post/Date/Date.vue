<template>
  <div class="Date">
    <div v-if="text.length < 1 " class="empty">
      <Empty />
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
  background: #151515;
  color: #fdfdfd;
  font-size: 18px;
  margin-bottom: 20px;
}

@media screen and (max-width: 768px) {
  .Date {
    font-size: 14px;
    margin-bottom: 16px;
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
