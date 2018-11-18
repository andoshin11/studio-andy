<template>
  <div class="Markdown">
    <div v-html="markedContents"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import marked from 'marked'
import Prism from 'prismjs'

interface IData {}

export default Vue.extend({
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data(): IData {
    return {}
  },
  computed: {
    markedContents(): any {
      return marked(this.text)
    }
  },
  mounted() {
    const targetList = document.querySelectorAll('code')
    Array.from(targetList).forEach(target => Prism.highlightElement(target))
  }
})
</script>

<style>
.Markdown {
  width: 100%;
}

/* Element Styles */
.Markdown p {
  font-size: 18px;
  line-height: 33px;
  letter-spacing: 0.65px;
  margin: 50px auto 0;
}

@media screen and (max-width: 768px) {
  .Markdown p {
    font-size: 16px;
    line-height: 30px;
  }
}

.Markdown p:first-child {
  margin-top: 0;
}

.Markdown img {
  width: 100%;
}

.Markdown a {
  color: #ef6530;
  text-decoration: underline;
  transition: 0.3s;
}

.Markdown a:hover {
  opacity: 0.6;
}

.Markdown h1 {
  margin-top: 50px;
  font-size: 24px;
  position: relative;
  padding-left: 8px;
}

@media screen and (max-width: 768px) {
  .Markdown h1 {
    margin-left: 0;
    border-bottom: solid 2px #666;
  }
}

.Markdown h1::before {
  height: 34px;
  content: '';
  display: block;
  border-left: solid 4px #5b3cc4;
  position: absolute;
  left: 0;
}

@media screen and (max-width: 768px) {
  .Markdown h1::before {
    content: none;
  }
}

.Markdown h2 {
  font-size: 20px;
}

@media screen and (max-width: 768px) {
  .Markdown h2 {
    margin-left: 5%;
  }
}

.Markdown h2::after {
  content: ':';
}

.Markdown div.embedly-card {
  padding: 8px;
  box-sizing: border-box;
  box-shadow: 0 8.09px 24.26px rgba(67, 54, 102, 0.08);
  overflow: hidden;
  border-radius: 8px;
  transition: 0.3s ease-out;
}

.Markdown div.embedly-card:hover {
  box-shadow: 0 28.3px 88.94px rgba(67, 54, 102, 0.2);
}

.Markdown ul {
  list-style: none;
}

@media screen and (max-width: 768px) {
  .Markdown ul {
    margin-top: 16px;
    margin-left: 5%;
  }
}

.Markdown li {
  font-size: 20px;
  line-height: 2;
  padding-left: 24px;
}

@media screen and (max-width: 768px) {
  .Markdown li {
    padding-left: 28px;
    font-size: 16px;
  }
}

.Markdown li::before {
  content: '■';
  position: absolute;
  margin-left: -30px;
  font-size: 14px;
  line-height: 40px;
  color: #5b3cc4;
}

@media screen and (max-width: 768px) {
  .Markdown li::before {
    line-height: 32px;
  }
}

.Markdown pre {
  margin-top: 16px;
}

.Markdown hr {
  margin: 48px 0;
}

@media screen and (max-width: 768px) {
  .Markdown hr {
    margin: 32px 0;
  }
}
</style>
