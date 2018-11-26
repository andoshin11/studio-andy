<template>
  <div class="Error">エラー出ててわろた {{ error }}</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    error: {
      type: Object,
      required: true
    }
  }
})
</script>
