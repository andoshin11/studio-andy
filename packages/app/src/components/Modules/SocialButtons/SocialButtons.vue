<template>
  <div class="SocialButtons">
    <a 
      :href="`http://b.hatena.ne.jp/entry/${pagePath}`" 
      class="socialButton">
      <svg
        width="20px"
        height="40px"
        viewBox="0 0 141.732 141.732"
        enable-background="new 0 0 141.732 141.732"
      >
        <g>
          <circle 
            cx="119.684" 
            cy="107.843" 
            r="13.979"/>
          <rect 
            x="106.954" 
            y="16.517" 
            width="25.459" 
            height="69.532"/>
          <path
            d="M68.231,63.296c0,0,17.591-1.109,17.591-22.191c0-24.41-22.029-24.533-34.604-24.533c-8.157,0-12.277,0-17.691,0H22.74
H8.068v105.305h8.014h17.445c4.512,0,10.171,0,17.321,0c34.766,0,40.684-19.007,40.684-31.212S85.614,66.995,68.231,63.296z
M34.896,36.406c9.703,0,9.267,0,11.835,0c2.219,0,11.835,0.946,11.835,10.1c0,10.818-8.322,10.449-13.869,10.449
c-5.548,0-2.774,0-9.801,0V36.406z M48.765,99.487c-6.473,0-9.062,0-13.87,0V76.372c0,0,6.103,0,14.147,0
c8.044,0,14.146,1.664,14.146,11.558S55.237,99.487,48.765,99.487z"
          />
        </g>
      </svg>
    </a>
    <a
      :href="`http://twitter.com/share?url=${pagePath}&text=${post.props.title}`"
      class="socialButton"
      target="_blank"
    >
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
      :href="`http://getpocket.com/edit?url=${pagePath}`" 
      class="socialButton" 
      target="_blank">
      <svg
        width="20px"
        height="40px"
        viewBox="0 0 141.732 141.732"
        enable-background="new 0 0 141.732 141.732"
        xml:space="preserve"
      >
        <path
          d="M121.846,14.023H19.117c-6.987,0-12.65,5.664-12.65,12.65v34.759c0,0.279,0.013,0.536,0.03,0.781
c-0.019,0.606-0.03,1.223-0.03,1.857c0,35.355,28.661,64.015,64.016,64.015c34.973,0,63.376-28.049,63.986-62.877
c0.018-0.235,0.029-0.483,0.029-0.762V26.674C134.498,19.688,128.833,14.023,121.846,14.023z M106.234,62.008L77.575,90.665
c-1.937,1.938-4.568,2.747-7.093,2.443c-2.523,0.305-5.156-0.505-7.093-2.442L34.73,62.008c-3.349-3.349-3.349-8.778,0-12.126
c3.349-3.349,8.779-3.349,12.127,0l23.625,23.624l23.624-23.624c3.35-3.349,8.779-3.349,12.128,0
C109.582,53.229,109.582,58.66,106.234,62.008z"
        />
      </svg>
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PostEntity from '@/entities/Post'

interface IData {}

export default Vue.extend({
  props: {
    pagePath: {
      type: String,
      required: true
    },
    post: {
      type: Object as () => PostEntity,
      required: true
    }
  },
  data(): IData {
    return {}
  }
})
</script>

<style scoped>
.SocialButtons {
  width: 0;
  margin: 0;
}

@media screen and (max-width: 768px) {
  .SocialButtons {
    display: flex;
    width: auto;
    margin-bottom: 24px;
    padding-left: 24px;
  }
}

.socialButton {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 40px;
  height: 40px;
  margin-bottom: 15px;
  background: transparent;
  border: solid 1px #ddd;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s ease-out;
  -webkit-appearance: none;
  fill: #777;
}

@media screen and (max-width: 768px) {
  .socialButton {
    margin-right: 16px;
  }
}

.socialButton > svg {
  height: 40px;
}

.socialButton:hover,
.socialButton:focus {
  box-shadow: 0 8.09px 24.26px rgba(67, 54, 102, 0.08);
}
</style>
