interface EmbededContent {
  app_links: string[]
  authors: string[]
  cache_age: number
  content: boolean
  description: string
  favicon_colors: {
    color: number[]
    weight: number
  }[]
  favicon_url: string
  images: {
    caption?: string
    url: string
    height: number
    width: number
  }[]
  keywords: string[]
  language: string
  media: any
  original_url: string
  provider_display: string
  provider_name: string
  provider_url: string
  published: boolean
  related: any[]
  safe: boolean
  title: string
  type: 'html'
  url: string
}

export default class Embed {
  apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async getContents(urls: string[]): Promise<EmbededContent[]> {
    const options = {
      card: 1,
      key: this.apiKey,
      native: true,
      scheme: 'https',
      urls: urls.join(',')
    }

    const createParams = (data: { [key: string]: any }): string => {
      const params = Object.keys(data).map(key => key + '=' + String(data[key]))
      return params.join('&')
    }

    const requestUrl = 'http://api-cdn.embed.ly/1/card-details?' + createParams(options)
    return await fetch(requestUrl).then(res => res.json())
  }
}
