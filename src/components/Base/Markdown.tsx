import * as tsx from 'vue-tsx-support'
import { css } from 'emotion'
import marked from 'marked'
import Prism from 'prismjs'
import Embed from '@/lib/embed'
import { bp } from '@/util/helpers'

export default tsx.component({
  name: 'Markdown',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    markedContents(): any {
      return marked(this.text)
    }
  },
  methods: {
    async getApiKey(): Promise<string> {
      const source = await fetch('//cdn.embedly.com/widgets/platform.js', {}).then(res => res.text())
      const key = source.match(/\.EMB_API_KEY="([^"]*)"/)
      if (!key) throw new Error('Embedly key not found.')

      return key[1]
    },
    async transformEmbedded() {
      const apiKey = await this.getApiKey()
      const targetList = Array.from(document.querySelectorAll('.embedly-card')).filter(el => el.hasAttribute('href'))
      const urls = targetList.map(el => el.getAttribute('href') as string)

      const contents = await new Embed(apiKey).getContents(urls)

      targetList.forEach(el => {
        const content = contents.find(c => c.original_url === el.getAttribute('href'))
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
  },
  async mounted() {
    // Highlight Code
    const targetList = document.querySelectorAll('code')
    Array.from(targetList).forEach(target => Prism.highlightElement(target))

    await this.transformEmbedded()
  },
  render() {
    return (
      <div class={styles.Markdown}>
        <div domPropsInnerHTML={this.markedContents} />
      </div>
    )
  }
})

const styles = {
  Markdown: css`
    position: relative;
    width: 100%;

    /* Card Styles */
    .embedly-card {
      text-decoration: none;
    }

    .card {
      box-sizing: border-box;
      padding: 16px;
      overflow: hidden;
      color: #222;
      border-radius: 8px;
      box-shadow: 0 8.09px 24.26px rgba(67, 54, 102, 0.08);
      transition: 0.3s ease-out;
    }

    .card:hover {
      box-shadow: 0 28.3px 88.94px rgba(67, 54, 102, 0.2);
    }

    .card__header {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
    }

    .card__favicon {
      width: 16px;
      height: 16px;
      margin: 0 4px 0 0;
    }

    .card__provider {
      color: #222;
      font-weight: bold;
      font-size: 14px;
      text-decoration: none;
    }

    .card__body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding: 0 16px;
    }

    .card__body.is-wide {
      flex-direction: column;
      align-items: stretch;
    }

    ${bp.sm} {
      .card__body {
        flex-direction: column;
        margin-bottom: 16px;
        padding: 0;
      }
    }

    ${bp.sm} {
      .card__body iframe {
        width: auto;
        height: auto;
      }
    }

    .card__thumbnail {
      display: block;
      width: 180px;
      margin: 0 24px 0 0;
      box-shadow: none;
    }

    .card__body.is-wide .card__thumbnail {
      width: 100%;
      margin-bottom: 16px;
    }

    ${bp.sm} {
      .card__thumbnail {
        margin-bottom: 16px;
      }
    }

    .card__title {
      margin-bottom: 8px;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
    }

    .card__description {
      margin-bottom: 8px;
      font-size: 12px;
      line-height: 20px;
    }

    .card__nav {
      font-size: 12px;
      line-height: 20px;
      text-decoration: none;
    }

    /* Element Styles */
    p {
      margin: 36px auto;
      font-size: 18px;
      line-height: 33px;
      letter-spacing: 0.65px;
    }

    ${bp.sm} {
      p {
        font-size: 16px;
        line-height: 30px;
      }
    }

    p:first-child {
      margin-top: 0;
    }

    img {
      width: 100%;
      margin: 24px auto;
      box-shadow: 2px 2px 40px -12px #999;
    }

    a {
      color: #1a95b3;
      text-decoration: underline;
      transition: 0.3s;
    }

    a:hover {
      opacity: 0.6;
    }

    h1 {
      position: relative;
      margin-top: 50px;
      padding-left: 12px;
      font-size: 24px;
    }

    ${bp.sm} {
      h1 {
        margin-left: 0;
        padding-left: 4px;
        color: #4d4d4d;
        border-bottom: solid 2px #4d4d4d;
      }
    }

    h1::before {
      position: absolute;
      left: 0;
      display: block;
      height: 34px;
      border-left: solid 4px #4d4d4d;
      content: '';
    }

    ${bp.sm} {
      h1::before {
        content: none;
      }
    }

    h2 {
      margin: 50px 0 0;
      font-size: 24px;
    }

    h3 {
      font-size: 20px;
    }

    h3::after {
      position: absolute;
      left: 0;
      display: block;
      width: 30px;
      height: 4px;
      border-bottom: solid 2px #ef6530;
      content: '';
    }

    .table-wrapper {
      overflow: auto;
      white-space: nowrap;
    }

    thead {
      color: #fefefe;
      background: #ef6530;
    }

    ul {
      list-style: none;
    }

    ${bp.sm} {
      ul {
        margin-top: 16px;
        margin-left: 5%;
      }
    }

    li {
      padding-left: 24px;
      font-size: 18px;
      line-height: 2;
    }

    ${bp.sm} {
      li {
        padding-left: 12px;
        font-size: 16px;
      }
    }

    li::before {
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

    ol li::before {
      content: none;
    }

    ${bp.sm} {
      li::before {
        line-height: 32px;
      }
    }

    hr {
      margin: 48px 0;
    }

    ${bp.sm} {
      hr {
        margin: 32px 0;
      }
    }

    pre {
      margin-top: 16px;
      text-shadow: none;
      background: #282c34;
      border-radius: 8px;
    }

    pre.language-shell {
      text-shadow: none;
      background: #282c34;
      border-radius: 8px;
    }

    code[class*='language-'] {
      color: #fff;
      text-shadow: none;
    }

    :not(pre) > code[class*='language-'] {
      margin-right: 4px;
      padding: 4px 8px;
      color: #fff;
      font-size: 90%;
      text-shadow: none;
      background: #282c34;
      border-radius: 8px;
    }

    ${bp.sm} {
      :not(pre) > code[class*='language-'] {
        font-size: 85%;
      }
    }

    .token.punctuation {
      color: #fff;
    }

    .token.string {
      color: #98c379;
    }

    .token.string,
    .token.attr-name {
      color: #92d761;
    }

    .token.boolean {
      color: #c70370;
    }

    .token.keyword {
      color: #66b9f4;
    }

    .token.selector,
    .token.number {
      color: #e4c625;
    }

    .token.property {
      color: #42abd6;
    }

    .token.operator {
      color: #e2810e;
      background: none;
    }

    .token.comment {
      color: #a1a8b5;
    }

    .token.function {
      color: #e2810e;
    }

    .token.tag,
    .token.constant {
      color: #de254b;
    }
  `
}
