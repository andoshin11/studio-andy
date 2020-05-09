<template>
  <div class="Date">
    <div 
      v-if="text.length < 1" 
      class="empty">
      <Empty />
    </div>
    {{ date }}
  </div>
  
</template>

<script lang="ts">
import { defineComponent, computed } from 'nuxt-composition-api'
import dayjs from 'dayjs'
import Empty from '@/components/Base/Empty'

export default defineComponent({
  name: 'Date',
  components: {
    Empty
  },
  props: {
    text: {
      type: String,
      required: true as true,
      default: ''
    }
  },
  setup(props) {
    const { text } = props
    const date = computed(() => {
      return text.length > 1 ? dayjs(text).format('MMM D, YYYY') : ''
    })

    return {
      date
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
