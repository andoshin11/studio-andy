import * as tsx from 'vue-tsx-support'
import marked from 'marked'
import Prism from 'prismjs'
import Embed from '@/lib/embed'
import './styles.css'

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
      <div class="Markdown">
        <div domPropsInnerHTML={this.markedContents} />
      </div>
    )
  }
})
