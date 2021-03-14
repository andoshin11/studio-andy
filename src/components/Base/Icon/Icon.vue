<template>
  <svg class="Icon">
    <use :xlink:href="iconPath" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { name } = props
    const iconPath = computed(() => {
      return `/${name}.svg#root`
    })

    return {
      iconPath,
    }
  },
})
</script>

<style scoped>
.Icon {
  width: 100%;
  height: 100%;
}
</style>
