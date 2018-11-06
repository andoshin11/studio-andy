<template>
  <header class="Header">
    <div class="Header__Background" />

    <div class="Header__Nav">
      <nav>
        <ul class="Header__NavList">
          <nuxt-link class="Header__NavItem" exact to="/"><li>Studio Andy</li></nuxt-link>
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
  width: 100vw;
  height: 300px;
  position: relative;
}

.Header::before {
  content: '';
  z-index: 10;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 0,
    transparent 36%,
    rgba(0, 0, 0, 0.65) 100%
  );
  opacity: 0.6;
}

.Header__Background {
  position: absolute;
  width: 100vw;
  height: 300px;
  overflow: hidden;
  top: 0;
  background: url(/header.jpg) center bottom -150px;
  background-size: cover;
}

.Header__Nav > nav {
  max-width: 1000px;
  z-index: 1000;
  margin: 0 auto;
  position: relative;
}

.Header__NavList {
  padding: 16px 0;
}

.Header__NavItem {
  color: #fff;
  cursor: pointer;
}
</style>
