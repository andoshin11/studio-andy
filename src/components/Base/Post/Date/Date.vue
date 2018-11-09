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

interface IData {}

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
  data(): IData {
    return {}
  },
  computed: {
    date(): string {
      if (this.text.length > 1) {
        return dayjs(this.text).format('M.D.YY')
      }
      return ''
    }
  }
})
</script>

<style scoped>
.Date {
  color: #aaa;
  font-size: 18px;
  font-family: MetaSerifPro, serif;
  margin-bottom: 20px;
}

.empty {
  width: 64px;
  height: 27px;
}
</style>
