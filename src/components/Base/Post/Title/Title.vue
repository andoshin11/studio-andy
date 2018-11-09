<template>
  <h1 class="Title" :class="{ empty: title.length < 1 }">
    {{ title }}
  </h1>
</template>

<script lang="ts">
import Vue from 'vue'

interface IData {}

export default Vue.extend({
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
}

.Title.empty {
  height: 48px;
  background-color: #eee;
}
</style>
