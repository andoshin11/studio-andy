<template>
  <header class="Header">
    <nav class="nav"/>
    <nuxt-link 
      exact 
      to="/" 
      class="logo">
      Studio Andy
    </nuxt-link>
    <div class="actions">
      <div class="search">
        <button class="searchButton"/>
      </div>
    </div>
  </header>
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
.Header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
  color: #151515;
  background-color: #fff;
  border-bottom: solid 1px #ccc;
}

@media screen and (max-width: 768px) {
  .Header {
    margin: 0;
  }
}

.logo {
  color: #151515;
  font-weight: bold;
  font-size: 24px;
  letter-spacing: 1px;
}

@media screen and (max-width: 768px) {
  .logo {
    font-size: 18px;
  }
}

/*
.logo::after {
  width: 100%;
  height: 1px;
  content: '';
  display: block;
  border-bottom: solid 3px #ff6b00;
}
*/
</style>
