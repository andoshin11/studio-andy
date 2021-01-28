import { Asset } from 'contentful'
import dayjs from 'dayjs'
import BaseEntity from './Base'
import { STANDARD_DATE_FORMAT } from '@/common/const'

export type Tag = string

export type SortableKey = Exclude<keyof PostData, 'id'>

export interface PostData {
  slug: string
  id: string
  headerImage: Asset
  headerImageLight: Asset
  content: string
  summary: string
  publishedAt: string
  title: string
  tags: Tag[]
  isPublished: boolean
}

export default class Post extends BaseEntity<PostData> {
  get publishedAtStr() {
    const { publishedAt } = this.toJson()
    return dayjs(publishedAt).format(STANDARD_DATE_FORMAT)
  }

  get headerImageURL() {
    const { headerImage } = this.toJson()
    return headerImage ? headerImage.fields.file.url : ''
  }

  get headerImageLightURL() {
    const { headerImageLight } = this.toJson()
    return headerImageLight ? headerImageLight.fields.file.url : ''
  }

  get headerImageLightFileName() {
    const { headerImageLight } = this.toJson()
    return headerImageLight ? headerImageLight.fields.file.fileName : ''
  }

  getEmbedlyURLs(): string[] {
    const { content } = this.toJson()
    const matched = content.matchAll(/<a href="([^"]*)" class="embedly-card"[^>]*>/g)

    let urls: string[] = []
    for (const m of matched) {
      urls.push(m[1])
    }

    return urls
  }
}

const AssetFactory = (): Asset => {
  return {
    fields: {
      title: 'vuefes',
      description: 'Vue Fes Japan 2018',
      file: {
        contentType: 'image/jpeg',
        details: {
          size: 1000
        },
        fileName: 'vuefes.jpg',
        url: '//images.ctfassets.net/2p1otbbee5vt/1IT8b2qoAEyc0SOwqSy6QS/f5f517ed6f292497270bf3b85d608dea/vuefes.jpg'
      }
    },
    sys: {
      type: 'Asset',
      id: '1IT8b2qoAEyc0SOwqSy6QS',
      createdAt: '2018-11-09T03:15:59.963Z',
      updatedAt: '2018-11-09T03:30:05.899Z',
      locale: 'en-US',
      contentType: {
        sys: {
          id: 'master',
          type: 'Link',
          linkType: 'ContentType'
        }
      }
    },
    toPlainObject(): any {}
  }
}

export const PostDataFactory = (data?: Partial<PostData>): PostData => {
  return {
    slug: 'dummy',
    id: 'dummyId',
    tags: ['Life', 'Space'],
    summary: '海外ゲストのアテンドスタッフとして、日本初のVue.jsカンファレンスに参加してきました。イベントの参加レポートと、翌日の東京観光の様子をお届けします。 ',
    content: '2018/11/3 (土)に秋葉原UDXで開催されたVue Fes Japan 2018に、Vue.js日本ユーザーグループのスタッフとして参加してきました。↵↵Vue.jsのカンファレンスに参加するのは、今年2月のVue Conf Amsterdamに続き2回目です。今回は国内で初めての開催という',
    publishedAt: '2018-11-09T12:30+09:00',
    title: 'VueFes 2018にスタッフとして参加してきました。',
    headerImage: AssetFactory(),
    headerImageLight: AssetFactory(),
    isPublished: true,
    ...data
  }
}

export const PostFactory = (data?: Partial<PostData>): Post => {
  return new Post(PostDataFactory(data))
}
