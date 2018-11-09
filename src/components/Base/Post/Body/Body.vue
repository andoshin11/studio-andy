<template>
  <div class="Body">
    <VueMarkdown>
      {{ text }}
    </VueMarkdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueMarkdown from 'vue-markdown'

interface IData {}

export default Vue.extend({
  components: {
    VueMarkdown
  },
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data(): IData {
    return {}
  }
})
</script>

<style>
.Body {
  width: 1180px;
  color: #373737;
  display: flex;
  justify-content: center;
  position: relative;
  padding-bottom: 200px;
}

.Body p,
.Body h1,
.Body ul {
  width: 60%;
  margin-left: 20%;
}

.Body img {
  margin-left: -236px;
  width: 1180px;
}

.Body p {
  font-size: 18px;
  line-height: 33px;
  letter-spacing: 0.65px;
  margin: 50px auto 0;
}

.Body p:first-child {
  margin-top: 0;
}

.Body h1 {
  margin-top: 50px;
  font-size: 24px;
  position: relative;
  padding-left: 8px;
}

.Body h1::before {
  height: 34px;
  content: '';
  display: block;
  border-left: solid 3px #5b3cc4;
  position: absolute;
  left: 0;
}

.Body a {
  color: #5b3cc4;
}
</style>
