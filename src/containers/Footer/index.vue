<template>
  <div class="Footer">
    <div class="socialLinks">
      <a 
        class="socialLink" 
        href="https://twitter.com/" 
        target="_blank">
        <svg 
          height="16" 
          width="20" 
          viewBox="0 0 20 16">
          <path
            d="M9.4 4.3V5l-.7-.1C6.2 4.5 4 3.4 2.1 1.6L1.2.7l-.3.6c-.5 1.6-.2 3.2.9 4.2.6.6.4.7-.5.3-.4-.1-.7-.1-.7-.1-.1.1.2 1.4.5 1.9.4.7 1.1 1.4 1.9 1.8l.7.3h-.8c-.8 0-.8 0-.7.3.3.9 1.4 1.9 2.6 2.3l.9.3-.8.5c-1.1.7-2.4 1-3.7 1-.6 0-1.1.1-1.1.1 0 .1 1.7.9 2.7 1.2 3 .9 6.5.5 9.2-1 1.9-1.1 3.8-3.3 4.7-5.5.5-1.1 1-3.2 1-4.2 0-.7 0-.7.8-1.5.5-.5.9-.9 1-1.1.1-.3.1-.3-.6 0-1.2.4-1.4.4-.8-.3.4-.5 1-1.3 1-1.5 0 0-.2 0-.4.2-.3.1-.8.4-1.2.5l-.8.2-.7-.5c-.4-.3-.9-.5-1.2-.6-.7-.2-1.8-.2-2.4.1-2 .6-3.1 2.3-3 4.1z"
          />
        </svg>
      </a>
      <a 
        class="socialLink" 
        href="https://github.com/andoshin11" 
        target="_blank">
        <svg
          aria-hidden="true"
          data-prefix="fab"
          data-icon="github"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 512"
        >
          <path
            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
          />
        </svg>
      </a>
    </div>
    <div 
      class="copyright" 
      @click="test">Copyright © 2018 Shin Ando</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

// import Presenter, { IPresenter } from './presenter'

// Use Case

// Repositories

// Service

// components

export default Vue.extend({
  methods: {
    test() {
      throw new Error('This is a expected error. Shin is still testing')
    }
  }
})
</script>

<style scoped>
.Footer {
  width: 100%;
}

.socialLinks {
  display: flex;
  justify-content: center;
  margin: 100px auto 40px;
}

.socialLink {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  margin: 0 8px;
  border: solid 1px #ddd;
  border-radius: 50%;
  fill: #777;
}

.socialLink svg {
  width: 55%;
  height: 55%;
}

.copyright {
  color: #888;
  font-size: 14px;
  text-align: center;
}
</style>
