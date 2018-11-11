<template>
  <div class="App">
    <div class="App__Header">
      <HeaderContainer />
    </div>
    <div class="App__Body">
      <nuxt/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeaderContainer from '@/containers/Header/index.vue'

export default Vue.extend({
  components: {
    HeaderContainer
  }
})
</script>

<style scoped>
.App {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.App__Header,
.App__Body {
  width: 1180px;
}

@media screen and (max-width: 1024px) {
  .App__Header,
  .App__Body {
    width: 100%;
  }
}

.App__Header {
  height: 130px;
}

@media screen and (max-width: 1024px) {
  .App__Header {
    height: 100px;
  }
}
</style>
