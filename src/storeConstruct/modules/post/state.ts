import { PostData } from '@/domain/Post'
import { PostSummaryData } from '@/domain/PostSummary'

export interface PostState {
  byIds: {
    [slug: string]: PostData
  }
  postSummaries: Record<PostSummaryData['slug'], PostSummaryData>
  searchResult: string[]
  tagResult: string[]
  searchQuery: string | null
  currentTag: string | null
}

export const initialState = (): PostState => ({
  byIds: {},
  postSummaries: {},
  searchResult: [],
  tagResult: [],
  searchQuery: null,
  currentTag: null,
})
