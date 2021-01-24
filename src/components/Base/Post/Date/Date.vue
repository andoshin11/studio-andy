<template>
  <div class="Date">
    <div 
      v-if="text.length < 1" 
      class="empty">
      <Empty />
    </div>
    {{ text }}
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Empty from '@/components/Base/Empty'

export default defineComponent({
  name: 'Date',
  components: {
    Empty
  },
  props: {
    text: {
      type: String,
      required: true
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
