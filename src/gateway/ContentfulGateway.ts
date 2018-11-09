import { Entry } from 'contentful'
import { createClient } from '@/infra/contentful/client'
import { IPostProps } from '@/entities/Post'
import { ITagProps } from '@/entities/Tag'

export default class ContentfulGateway {
  transtormEntry(entry: Entry<IPostProps>): IPostProps {
    const { id } = entry.sys
    const fields = entry.fields
    const tags = fields.tags.map(
      (tag: any): ITagProps => {
        const entry: Entry<ITagProps> = tag
        return {
          id: entry.sys.id,
          name: entry.fields.name
        }
      }
    )

    return {
      ...fields,
      tags,
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
