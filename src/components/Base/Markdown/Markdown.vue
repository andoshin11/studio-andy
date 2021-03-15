<template>
  <div class="Markdown">
    <div v-html="markedContents" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from '@nuxtjs/composition-api'
import marked from 'marked'
import Prism from 'prismjs'
import Embed from '@/lib/embed'

export default defineComponent({
  name: 'Markdown',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    // Computed
    const markedContents = computed(() => marked(props.text))

    // Methods
    const getApiKey = async () => {
      const source = await fetch('//cdn.embedly.com/widgets/platform.js', {}).then((res) => res.text())
      const key = source.match(/\.EMB_API_KEY="([^"]*)"/)
      if (!key) throw new Error('Embedly key not found.')

      return key[1]
    }
    const transformEmbedded = async () => {
      const apiKey = await getApiKey()
      const targetList = Array.from(document.querySelectorAll('.embedly-card')).filter((el) => el.hasAttribute('href'))
      const urls = targetList.map((el) => el.getAttribute('href') as string)

      const contents = await new Embed(apiKey).getContents(urls)
      targetList.forEach((el) => {
        const content = contents.find((c) => c.original_url === el.getAttribute('href'))
        if (!content) return
        el.setAttribute('target', '_blank')
        const defaultImage = content.images[0] || {}
        const isWide = defaultImage && defaultImage.width > defaultImage.height
        el.innerHTML = `
          <div class="card">
            <div class="card__header">
              <img src="${content.favicon_url}" class="card__favicon">
              <a class="card__provider" target="_blank" href="${content.provider_url}">${content.provider_name}</a>
            </div>
            ${
              content.media.type === 'video'
                ? `
                <div class="card__body">
                  ${content.media.html}
                </div>
              `
                : `
                <div class="card__body ${isWide ? 'is-wide' : null}">
                  <img class="card__thumbnail" src="https://i-cdn.embed.ly/1/display/resize?key=${apiKey}&url=${encodeURI(defaultImage.url)}&width=${isWide ? defaultImage.width : 180}">
                  <div class="card__content">
                    <div class="card__title">${content.title}</div>
                    <div class="card__description">${content.description}</div>
                    <a class="card__nav" target="_blank" href="${content.provider_url}">${content.provider_display}でこれを読む ></a>
                  </div>
                </div>
              `
            }
          </div>
        `
      })
    }

    // Lifecycle
    onMounted(async () => {
      // Highlight Code
      const targetList = document.querySelectorAll('code')
      Array.from(targetList).forEach((target) => Prism.highlightElement(target))

      await transformEmbedded()
    })

    return {
      markedContents,
      getApiKey,
      transformEmbedded,
    }
  },
})
</script>

<style>
.Markdown {
  position: relative;
  width: 100%;
}

/* Card Styles */
.Markdown .embedly-card {
  text-decoration: none;
}

.Markdown .card {
  box-sizing: border-box;
  padding: 16px;
  overflow: hidden;
  color: #222;
  border-radius: 8px;
  box-shadow: 0 8.09px 24.26px rgba(67, 54, 102, 0.08);
  transition: 0.3s ease-out;
}

.Markdown .card:hover {
  box-shadow: 0 28.3px 88.94px rgba(67, 54, 102, 0.2);
}

.Markdown .card__header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.Markdown .card__favicon {
  width: 16px;
  height: 16px;
  margin: 0 4px 0 0;
}

.Markdown .card__provider {
  color: #222;
  font-weight: bold;
  font-size: 14px;
  text-decoration: none;
}

.Markdown .card__body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 0 16px;
}

.Markdown .card__body.is-wide {
  flex-direction: column;
  align-items: stretch;
}

@media screen and (max-width: 768px) {
  .Markdown .card__body {
    flex-direction: column;
    margin-bottom: 16px;
    padding: 0;
  }
}

@media screen and (max-width: 768px) {
  .Markdown .card__body iframe {
    width: auto;
    height: auto;
  }
}

.Markdown .card__thumbnail {
  display: block;
  width: 180px;
  margin: 0 24px 0 0;
  box-shadow: none;
}

.Markdown .card__body.is-wide .card__thumbnail {
  width: 100%;
  margin-bottom: 16px;
}

@media screen and (max-width: 768px) {
  .Markdown .card__thumbnail {
    margin-bottom: 16px;
  }
}

.Markdown .card__title {
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
}

.Markdown .card__description {
  margin-bottom: 8px;
  font-size: 12px;
  line-height: 20px;
}

.Markdown .card__nav {
  font-size: 12px;
  line-height: 20px;
  text-decoration: none;
}

/* Element Styles */
.Markdown p {
  margin: 36px auto;
  font-size: 18px;
  line-height: 33px;
  letter-spacing: 0.65px;
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
  margin: 24px auto;
  box-shadow: 2px 2px 40px -12px #999;
}

.Markdown a {
  color: #1a95b3;
  text-decoration: underline;
  transition: 0.3s;
}

.Markdown a:hover {
  opacity: 0.6;
}

.Markdown h1 {
  position: relative;
  margin-top: 50px;
  padding-left: 12px;
  font-size: 24px;
}

@media screen and (max-width: 768px) {
  .Markdown h1 {
    margin-left: 0;
    padding-left: 4px;
    color: #4d4d4d;
    border-bottom: solid 2px #4d4d4d;
  }
}

.Markdown h1::before {
  position: absolute;
  left: 0;
  display: block;
  height: 34px;
  border-left: solid 4px #4d4d4d;
  content: '';
}

@media screen and (max-width: 768px) {
  .Markdown h1::before {
    content: none;
  }
}

.Markdown h2 {
  margin: 50px 0 0;
  font-size: 24px;
}

.Markdown h3 {
  font-size: 20px;
}

.Markdown h3::after {
  position: absolute;
  left: 0;
  display: block;
  width: 30px;
  height: 4px;
  border-bottom: solid 2px #ef6530;
  content: '';
}

.Markdown .table-wrapper {
  overflow: auto;
  white-space: nowrap;
}

.Markdown thead {
  color: #fefefe;
  background: #ef6530;
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
  padding-left: 24px;
  font-size: 18px;
  line-height: 2;
}

@media screen and (max-width: 768px) {
  .Markdown li {
    padding-left: 12px;
    font-size: 16px;
  }
}

.Markdown li::before {
  position: absolute;
  width: 8px;
  height: 8px;
  margin-top: 16px;
  margin-left: -20px;
  color: #1a95b3;
  line-height: 40px;
  background: #1a95b3;
  border-radius: 50%;
  content: '';
}

.Markdown ol li::before {
  content: none;
}

@media screen and (max-width: 768px) {
  .Markdown li::before {
    line-height: 32px;
  }
}

.Markdown hr {
  margin: 48px 0;
}

@media screen and (max-width: 768px) {
  .Markdown hr {
    margin: 32px 0;
  }
}

.Markdown pre {
  margin-top: 16px;
  text-shadow: none;
  background: #282c34;
  border-radius: 8px;
}

.Markdown pre.language-shell {
  text-shadow: none;
  background: #282c34;
  border-radius: 8px;
}

.Markdown code[class*='language-'] {
  color: #fff;
  text-shadow: none;
}

.Markdown :not(pre) > code[class*='language-'] {
  margin-right: 4px;
  padding: 4px 8px;
  color: #fff;
  font-size: 90%;
  text-shadow: none;
  background: #282c34;
  border-radius: 8px;
}

@media screen and (max-width: 768px) {
  .Markdown :not(pre) > code[class*='language-'] {
    font-size: 85%;
  }
}

.Markdown .token.punctuation {
  color: #fff;
}

.Markdown .token.string {
  color: #98c379;
}

.Markdown .token.string,
.Markdown .token.attr-name {
  color: #92d761;
}

.Markdown .token.boolean {
  color: #c70370;
}

.Markdown .token.keyword {
  color: #66b9f4;
}

.Markdown .token.selector,
.Markdown .token.number {
  color: #e4c625;
}

.Markdown .token.property {
  color: #42abd6;
}

.Markdown .token.operator {
  color: #e2810e;
  background: none;
}

.Markdown .token.comment {
  color: #a1a8b5;
}

.Markdown .token.function {
  color: #e2810e;
}

.Markdown .token.tag,
.Markdown .token.constant {
  color: #de254b;
}
</style>
