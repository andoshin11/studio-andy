<template>
  <div 
    :class="[size, type]" 
    class="Loading">
    <div class="Loading__Dot" />
    <div class="Loading__Dot" />
    <div class="Loading__Dot" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { oneOf } from '@/util/helpers'

export default defineComponent({
  name: 'Loading',
  props: {
    size: {
      type: String,
      default: 'md',
      validator: oneOf(['sm', 'md', 'lg'])
    },
    type: {
      type: String,
      default: 'light',
      validator: oneOf(['light', 'dark'])
    }
  }
})
</script>

<style scoped>
.Loading {
  display: inline-block;
  font-size: 0;
  text-align: center;
  vertical-align: middle;
}
.Loading__Dot {
  display: inline-block;
  border-radius: 100%;
  opacity: 0.4;
  animation: Loading 1.5s 0s infinite linear;
  animation-fill-mode: both;
}
.Loading__Dot:nth-child(1) {
  animation-delay: 0s;
}
.Loading__Dot:nth-child(2) {
  animation-delay: 0.5s;
}
.Loading__Dot:nth-child(3) {
  animation-delay: 1s;
}
.Loading.light .Loading__Dot {
  background-color: #aaa;
}
.Loading.dark .Loading__Dot {
  background-color: #fff;
}
.Loading.sm .Loading__Dot {
  width: 4px;
  height: 4px;
  margin: calc(8px * 0.5);
}
.Loading.md .Loading__Dot {
  width: 8px;
  height: 8px;
  margin: calc(8px * 0.75);
}
.Loading.lg .Loading__Dot {
  width: 12px;
  height: 12px;
  margin: 8px;
}
@keyframes Loading {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}
</style>
