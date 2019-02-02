<template>
  <div class="Empty"/>
</template>

<script lang="ts">
import Vue from 'vue'

interface IData {}

export default Vue.extend({
  props: {},
  data(): IData {
    return {}
  }
})
</script>

<style scoped>
.Empty {
  width: 100%;
  height: 100%;
  animation: bg-color 5s infinite;
}

@keyframes bg-color {
  0% {
    background-color: #eee;
  }

  50% {
    background-color: #ccc;
  }

  100% {
    background-color: #eee;
  }
}
</style>
