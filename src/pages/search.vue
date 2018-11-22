<template>
  <section class="container">
    <ResultContainer />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import ResultContainer from '@/containers/Result/index.vue'

export default Vue.extend({
  components: {
    ResultContainer
  }
})
</script>


<style scoped>
.container {
  width: 1180px;
  margin: 0 auto;
}

@media screen and (max-width: 768px) {
  .container {
    width: 100%;
  }
}
</style>
