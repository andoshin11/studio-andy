import { Entry } from 'contentful'
import { PostData } from '@/domain/Post'
import { PostSummaryData } from '@/domain/PostSummary'

export function transtormEntry<T extends PostData | PostSummaryData>(entry: Entry<T>): T {
  const { id } = entry.sys
  const fields = entry.fields

  return {
    ...fields,
    id,
  }
}
