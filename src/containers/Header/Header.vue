<template>
  <div :class="{ shrink: shrink }" class="Header">
    <div class="inner">
      <nuxt-link exact to="/" class="logo"> Studio Andy </nuxt-link>
    </div>
    <form class="search" role="search" @submit.prevent="searchPosts">
      <input ref="inputRef" v-model="query" name="query" aria-label="query" type="text" class="searchInput" />
      <button type="submit" aria-label="search" class="searchButton">
        <Icon name="search" />
      </button>
      <div class="mask" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import Icon from '@/components/Base/Icon'

export default defineComponent({
  name: 'Header',
  components: {
    Icon,
  },
  props: {
    shrink: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const query = ref('')
    const inputRef = ref<HTMLInputElement | null>(null)

    const {
      app: { router },
    } = useContext()

    const searchPosts = () => {
      if (!query.value || !inputRef.value || !router) return
      inputRef.value.blur()
      router.push({ path: `/search?query=${query.value}` })
      query.value = ''
    }

    return {
      query,
      inputRef,
      searchPosts,
    }
  },
})
</script>

<style scoped>
.Header {
  position: relative;
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
  color: #4d4d4d;
  background-color: #fefefe;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
}

@media screen and (max-width: 768px) {
  .Header {
    margin: 0;
  }
}

.inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 0.7s;
}

.Header.shrink .inner {
  left: 5%;
  transform: translate(0%, -50%);
}

@media screen and (max-width: 768px) {
  .Header.shrink .inner {
    left: 50%;
    transform: translate(-50%, -50%);
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
  cursor: pointer;
  transition: 0.5s ease-out;
}

.searchInput:focus {
  z-index: 8;
  box-sizing: border-box;
  width: 300px;
  padding: 0 24px;
  color: #666;
  font-size: 16px;
  background: #f0f0f0;
  outline: none;
  -webkit-appearance: none;
}

@media screen and (max-width: 768px) {
  .searchInput:focus {
    width: 90vw;
  }
}

.searchInput:focus::after {
  position: absolute;
  top: 0;
  left: 0;
  content: '';
  width: 100vw;
  height: 100vh;
}

.searchButton {
  position: absolute;
  top: 50%;
  right: 0;
  z-index: 9;
  width: 36px;
  height: 36px;
  color: #ef6530;
  background: transparent;
  border: none;
  border-radius: 36px;
  transform: translateY(-50%);
  opacity: 0.7;
}

.searchButton:focus {
  -webkit-appearance: none;
}

.searchInput:focus + .searchButton {
  color: #fff;
  background: #ef6530;
  opacity: 1;
}

.mask {
  display: none;
}

.searchInput:focus + .searchButton + .mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 7;
  display: block;
  width: 100vw;
  height: 100vh;
}
</style>
