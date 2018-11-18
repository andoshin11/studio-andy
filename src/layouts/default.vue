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
    <div @click="scrollToTop" class="scrollToTop">↑</div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.App__Header {
  width: 100%;
  height: 130px;
  position: fixed;
  background: #fff;
  z-index: 1000;
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
}

@media screen and (max-width: 1024px) {
  .App__Body {
    width: 100%;
    padding-top: 60px;
  }
}

.App__Footer {
  height: 400px;
}

.scrollToTop {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: #ef6530;
  position: fixed;
  bottom: 24px;
  right: 24px;
  color: #fdfdfe;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  line-height: 36px;
}
</style>
