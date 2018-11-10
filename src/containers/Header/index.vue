<template>
  <header class="Header">
    <div class="Header__Nav">
      <nav>
        <ul class="Header__NavList">
          <nuxt-link class="Header__NavItem logo" exact to="/">
            <li>STUDIO ANDY</li>
          </nuxt-link>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

import Presenter, { IPresenter } from './presenter'

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
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 130px;
  margin-bottom: 30px;
}

.Header__Nav > nav {
  width: 1180px;
  z-index: 1000;
  margin: 0 auto;
  position: relative;
}

@media screen and (max-width: 768px) {
  .Header__Nav > nav {
    width: 100%;
  }
}

.Header__NavList {
  display: flex;
  padding: 16px 0;
}

.logo {
  color: #000;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 24px;
}

.logo::after {
  width: 100%;
  height: 1px;
  content: '';
  display: block;
  border-bottom: solid 3px #5b3cc4;
}
</style>
