<template>
  <div :class="$style.App">
    <header 
      :class="[$style.App__Header, { [$style.shrink]: isHeaderShrink }]" 
      class="App__Header">
      <HeaderContainer :shrink="isHeaderShrink"/>
    </header>
    <main :class="$style.App__Body">
      <nuxt/>
    </main>
    <footer :class="$style.App__Footer">
      <FooterContainer/>
    </footer>
    <transition name="fade">
      <button
        v-show="showScrollToTop && screenPosition > 500"
        :class="$style.scrollToTop"
        @click="scrollToTop"
      >↑</button>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
const HeaderContainer = () => import('@/containers/Header/index.ts')
const FooterContainer = () => import('@/containers/Footer')
import { scrollWithDuration } from '@/lib/scroller'

export default Vue.extend({
  components: {
    HeaderContainer,
    FooterContainer
  },
  data() {
    return {
      screenPosition: 0,
      showScrollToTop: false
    }
  },
  computed: {
    isHeaderShrink(): boolean {
      return this.$route.name !== 'index'
    }
  },
  mounted() {
    if (window) {
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    scrollToTop() {
      const targetElement = document.scrollingElement || document.documentElement
      if (targetElement) {
        scrollWithDuration(targetElement)
        this.showScrollToTop = false
      }
    },
    handleScroll() {
      const position = window.scrollY
      if (this.screenPosition >= position) {
        this.showScrollToTop = true
      } else {
        this.showScrollToTop = false
      }
      this.screenPosition = position
    }
  }
})
</script>

<style module>
.App {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fafafa;
}

.App__Header {
  z-index: 1000;
  width: 100%;
  height: 130px;
  transition: height 0.5s;
}

.App__Header.shrink {
  height: 65px;
}

@media screen and (max-width: 1024px) {
  .App__Header {
    height: 60px;
  }
}

.App__Body {
  width: 100%;
}

.App__Footer {
  width: 100%;
  height: 400px;
}

.scrollToTop {
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 36px;
  height: 36px;
  padding: 0;
  color: #fdfdfe;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  background-color: #ef6530;
  border: solid 1px #ef6530;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.5s ease-out;
  -webkit-appearance: none;
}

.scrollToTop:hover,
.scrollToTop:focus {
  opacity: 0.6;
  -webkit-appearance: none;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>
