<template>
  <div class="App">
    <div class="App__Header">
      <HeaderContainer />
    </div>
    <div class="App__Body">
      <nuxt/>
    </div>
    <div class="App__Footer">
      <FooterContainer />
    </div>
    <div 
      class="scrollToTop" 
      @click="scrollToTop">↑</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeaderContainer from '@/containers/Header/index.vue'
import FooterContainer from '@/containers/Footer/index.vue'
import { scrollWithDuration } from '@/lib/scroller'

export default Vue.extend({
  components: {
    HeaderContainer,
    FooterContainer
  },
  methods: {
    scrollToTop() {
      const targetElement =
        document.scrollingElement || document.documentElement
      if (targetElement) {
        scrollWithDuration(targetElement)
      }
    }
  }
})
</script>

<style scoped>
.App {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.App__Header {
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 130px;
  background: #fff;
}

@media screen and (max-width: 1024px) {
  .App__Header {
    height: 60px;
  }
}

.App__Body {
  width: 1180px;
}

.App__Footer {
  width: 100%;
  height: 400px;
}

@media screen and (max-width: 1024px) {
  .App__Body {
    width: 100%;
    padding-top: 60px;
  }
}

.scrollToTop {
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 36px;
  height: 36px;
  color: #fdfdfe;
  font-weight: bold;
  font-size: 16px;
  line-height: 36px;
  text-align: center;
  background-color: #ef6530;
  border-radius: 4px;
}
</style>
