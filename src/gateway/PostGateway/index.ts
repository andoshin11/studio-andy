import { singleton, inject } from 'tsyringe'
import PostGateway from '@/interface/gateway/PostGateway'
import { ContentfulClient } from '@/infra/contentful'
import { PostData, SortableKey, Tag } from '@/domain/Post'
import { NotFoundError } from '@/common/errors'
import { transtormEntry } from './translator'

const CONTENT_TYPE = 'post'

@singleton()
export default class PostGatewayImpl implements PostGateway {
  constructor(@inject('ContentfulClient') private contentfulClient: ContentfulClient) {}

  async getPosts(orderBy: SortableKey = 'publishedAt') {
    const posts = await this.contentfulClient.getEntries<PostData>({
      content_type: CONTENT_TYPE,
      'fields.isPublished': true,
      order: `-fields.${orderBy}`
    })
    return posts.items.map(transtormEntry)
  }

  async getPost(slug: PostData['slug']) {
    const result = await this.contentfulClient.getEntries<PostData>({
      content_type: CONTENT_TYPE,
      'fields.slug': slug
    })

    if (!result || !result.items.length) {
      throw new NotFoundError(`Unavailable slug selected: ${slug}`)
    }
    return transtormEntry(result.items[0])
  }

  async getPostsByTag(tag: Tag) {
    const posts = await this.contentfulClient.getEntries<PostData>({
      content_type: CONTENT_TYPE,
      'fields.tags[in]': tag,
      'fields.isPublished': true,
      order: '-fields.publishedAt'
    })

    return posts.items.map(transtormEntry)
  }

  async searchPosts(query: string) {
    const posts = await this.contentfulClient.getEntries<PostData>({
      query
    })
    return posts.items.filter(post => post.fields.isPublished).map(transtormEntry)
  }
}
