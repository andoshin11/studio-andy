<template>
  <div class="Date" :class="{ empty: text.length < 1 }">
    {{ date }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'

interface IData {}

export default Vue.extend({
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

.Date.empty {
  width: 64px;
  height: 27px;
  background-color: #eee;
}
</style>
