import { singleton, inject } from 'tsyringe'
import PostGateway from '@/interface/gateway/PostGateway'
import { ContentfulClient } from '@/infra/contentful'
import { PostData, SortableKey, Tag } from '@/domain/Post'
import { PostSummaryData } from '@/domain/PostSummary'
import { NotFoundError } from '@/common/errors'
import { transtormEntry } from './translator'
import { UnionToTuple } from '@/types/helpers'

const CONTENT_TYPE = 'post'

const SUMMARY_FIELDS: UnionToTuple<Exclude<keyof PostSummaryData, 'id'>> = ['slug', 'headerImage', 'headerImageLight', 'summary', 'publishedAt', 'title', 'tags', 'isPublished']

const getSummarySelector = () => SUMMARY_FIELDS.map((f) => `fields.${f}`)

@singleton()
export default class PostGatewayImpl implements PostGateway {
  constructor(@inject('ContentfulClient') private contentfulClient: ContentfulClient) {}

  async getPostSummaries() {
    const postSummaries = await this.contentfulClient.getEntries<PostSummaryData>({
      content_type: CONTENT_TYPE,
      'fields.isPublished': true,
      select: getSummarySelector(),
      order: '-fields.publishedAt',
    })

    return postSummaries.items.map(transtormEntry)
  }

  async getPost(slug: PostData['slug']) {
    const result = await this.contentfulClient.getEntries<PostData>({
      content_type: CONTENT_TYPE,
      'fields.slug': slug,
    })

    if (!result || !result.items.length) {
      throw new NotFoundError(`Post not found: ${slug}`)
    }
    return transtormEntry(result.items[0])
  }

  async getPostsByTag(tag: Tag) {
    const posts = await this.contentfulClient.getEntries<PostSummaryData>({
      content_type: CONTENT_TYPE,
      'fields.tags[in]': tag,
      'fields.isPublished': true,
      select: getSummarySelector(),
      order: '-fields.publishedAt',
    })

    return posts.items.map(transtormEntry)
  }

  async searchPosts(query: string) {
    const posts = await this.contentfulClient.getEntries<PostSummaryData>({
      query,
      content_type: CONTENT_TYPE,
      'fields.isPublished': true,
      select: getSummarySelector(),
      order: '-fields.publishedAt',
    })
    return posts.items.filter((post) => post.fields.isPublished).map(transtormEntry)
  }
}
