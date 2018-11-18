<template>
  <div class="Footer">
    <div class="divider"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

// import Presenter, { IPresenter } from './presenter'

// Use Case

// Repositories

// Service

// components

interface IData {}

export default Vue.extend({
  data(): IData {
    return {}
  }
})
</script>

<style scoped>
.Footer {
  width: 100%;
  height: 100%;
  /* background-color: #151515; */
}

.divider {
  width: 90%;
  height: 1px;
  margin: 0 auto;
  border-top: solid 1px #ccc;
}
</style>
