<template>
  <div class="PostBody">
    <VueMarkdown>
      {{ text }}
    </VueMarkdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueMarkdown from 'vue-markdown'
import Prism from 'prismjs'

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
  },
  mounted() {
    const targetList = document.querySelectorAll('code')
    Array.from(targetList).forEach(target => Prism.highlightElement(target))
  }
})
</script>

<style>
.PostBody {
  width: 1180px;
  color: #373737;
  display: flex;
  justify-content: center;
  position: relative;
  padding-bottom: 200px;
  text-align: left;
}

.PostBody p,
.PostBody h1,
.PostBody h2,
.PostBody ul,
.PostBody pre {
  width: 60%;
  margin-left: 20%;
}

.PostBody img {
  margin-left: -236px;
  width: 1180px;
}

.PostBody p {
  font-size: 18px;
  line-height: 33px;
  letter-spacing: 0.65px;
  margin: 50px auto 0;
}

.PostBody p:first-child {
  margin-top: 0;
}

.PostBody h1 {
  margin-top: 50px;
  font-size: 24px;
  position: relative;
  padding-left: 8px;
}

.PostBody h1::before {
  height: 34px;
  content: '';
  display: block;
  border-left: solid 3px #5b3cc4;
  position: absolute;
  left: 0;
}

.PostBody h2 {
  font-size: 20px;
}

.PostBody h2::after {
  content: ':';
}

.PostBody a {
  color: #5b3cc4;
  text-decoration: underline;
  transition: 0.3s;
}

.PostBody a:hover {
  opacity: 0.6;
}

.PostBody div.embedly-card {
  padding: 8px;
  box-sizing: border-box;
  box-shadow: 0 8.09px 24.26px rgba(67, 54, 102, 0.08);
  overflow: hidden;
  border-radius: 8px;
  transition: 0.3s ease-out;
}

.PostBody div.embedly-card:hover {
  box-shadow: 0 28.3px 88.94px rgba(67, 54, 102, 0.2);
}

.PostBody ul {
  list-style: none;
}

.PostBody li {
  font-size: 20px;
  line-height: 2;
  padding-left: 24px;
}

.PostBody li::before {
  content: '■';
  position: absolute;
  margin-left: -30px;
  font-size: 14px;
  line-height: 40px;
  color: #5b3cc4;
}

.PostBody pre {
  margin-top: 16px;
}
</style>
