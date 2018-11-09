import { Entry } from 'contentful'
import { createClient } from '@/infra/contentful/client'
import { IPostProps } from '@/entities/Post'

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
      content_type: 'post'
    })
    return posts.items.map(this.transtormEntry)
  }
}
