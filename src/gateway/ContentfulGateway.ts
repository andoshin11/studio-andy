import { Entry } from 'contentful'
import { createClient } from '@/infra/contentful/client'
import { IPostProps } from '@/entities/Post'
import { NotFoundError } from '@/common/errors'

enum ContentType {
  POST = 'post'
}

export default class ContentfulGateway {
  transtormEntry(entry: Entry<IPostProps>): IPostProps {
    const { id } = entry.sys
    const fields = entry.fields

    return {
      ...fields,
      id
    }
  }

  async getPosts(): Promise<IPostProps[]> {
    const client = createClient()
    const posts = await client.getEntries<IPostProps>({
      content_type: 'post',
      order: '-fields.publishedAt'
    })
    return posts.items.map(this.transtormEntry)
  }

  async getPost(slug: string): Promise<IPostProps> {
    const client = createClient()
    const result = await client.getEntries<IPostProps>({
      content_type: 'post',
      'fields.slug': slug
    })

    if (!result || !result.items.length) {
      throw new NotFoundError(`Unavailable slug selected: ${slug}`)
    }
    return this.transtormEntry(result.items[0])
  }

  async getPostsByTag(tag: string): Promise<IPostProps[]> {
    const posts = await createClient().getEntries<IPostProps>({
      content_type: ContentType.POST,
      'fields.tags[in]': tag,
      order: '-fields.publishedAt'
    })

    return posts.items.map(this.transtormEntry)
  }

  async searchPosts(query: string): Promise<IPostProps[]> {
    const client = createClient()
    const posts = await client.getEntries<IPostProps>({
      query
    })
    return posts.items.map(this.transtormEntry)
  }
}
