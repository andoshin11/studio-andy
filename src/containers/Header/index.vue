<template>
  <header class="Header">
    <nav class="nav"/>
    <div class="inner">
      <nuxt-link 
        exact 
        to="/" 
        class="logo">
        Studio Andy
      </nuxt-link>
    </div>
    <form 
      class="search" 
      @submit.prevent="searchPosts">
      <input 
        ref="input"
        v-model="query"
        type="text" 
        class="searchInput">
      <button 
        type="submit" 
        class="searchButton">
        <Icon name="search"/>
      </button>
    </form>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

// import Presenter, { IPresenter } from './presenter'

// Use Case

// Repositories

// Gateway

// Service

// components
import Icon from '@/components/Base/Icon'

interface IData {
  query: string
}

export default Vue.extend({
  components: {
    Icon
  },
  data(): IData {
    return {
      query: ''
    }
  },
  methods: {
    searchPosts() {
      this.$refs.input.blur()
      this.$router.push({ path: `/search?query=${this.query}` })
      this.query = ''
    }
  }
})
</script>

<style scoped>
.Header {
  position: relative;
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
  color: #4d4d4d;
  background-color: #fff;
  border-bottom: solid 1px #ddd;
}

@media screen and (max-width: 768px) {
  .Header {
    margin: 0;
  }
}

.inner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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

.search {
  position: absolute;
  top: 0;
  right: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.searchInput {
  position: relative;
  z-index: 10;
  width: 36px;
  height: 36px;
  padding: 0;
  overflow: hidden;
  color: transparent;
  font-size: 16px;
  background: transparent;
  border: none;
  border-radius: 32px;
  transition: 0.5s ease-out;
}

.searchInput:focus {
  z-index: 8;
  box-sizing: border-box;
  width: 90vw;
  padding: 0 24px;
  color: #666;
  font-size: 16px;
  background: #f0f0f0;
  outline: none;
  -webkit-appearance: none;
}

.searchInput:focus::after {
  position: absolute;
  top: 0;
  left: 0;
  content: '';
  width: 100vw;
  height: 100vh;
  background: red;
}

.searchButton {
  position: absolute;
  top: 50%;
  right: 0;
  z-index: 9;
  width: 36px;
  height: 36px;
  color: #b38639;
  background: transparent;
  border: none;
  border-radius: 36px;
  transform: translateY(-50%);
}

.searchButton:focus {
  -webkit-appearance: none;
}

.searchInput:focus + .searchButton {
  color: #fff;
  background: #ef6530;
}
</style>
