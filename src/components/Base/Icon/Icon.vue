<template>
  <svg class="Icon">
    <use :xlink:href="iconPath"/>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    iconPath(): string {
      return `/svg/${this.name}.svg#root`
    }
  }
})
</script>

<style scoped>
.Icon {
  width: 100%;
  height: 100%;
}
</style>
