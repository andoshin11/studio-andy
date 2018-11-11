import { Entry, ContentfulClientApi } from 'contentful'
import { createClient } from '@/infra/contentful/client'
import { IPostProps } from '@/entities/Post'

enum ContentType {
  POST = 'post'
}

export default class ContentfulGateway {
  private _client: ContentfulClientApi

  constuctor() {
    this._client = createClient()
  }

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
      content_type: 'post'
    })
    return posts.items.map(this.transtormEntry)
  }

  async getPost(id: string): Promise<IPostProps> {
    const client = createClient()
    const post = await client.getEntry<IPostProps>(id)
    return this.transtormEntry(post)
  }

  async getPostsByTagId(tagId: string): Promise<IPostProps[]> {
    const posts = await this._client.getEntries<IPostProps>({
      content_type: ContentType.POST
    })

    return posts.items.map(this.transtormEntry)
  }
}
