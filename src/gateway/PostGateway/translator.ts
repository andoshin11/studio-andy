import { Entry } from 'contentful'
import { PostData } from '@/domain/Post'

export function transtormEntry(entry: Entry<PostData>): PostData {
  const { id } = entry.sys
  const fields = entry.fields

  return {
    ...fields,
    id
  }
}
