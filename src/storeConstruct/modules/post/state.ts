import { PostData } from '@/domain/Post'
import { PostSummaryData } from '@/domain/PostSummary'

export interface PostState {
  byIds: {
    [slug: string]: PostData
  }
  postSummaries: Record<PostSummaryData['slug'], PostSummaryData>
  latestPosts: string[]
  searchResult: string[]
  tagResult: string[]
  searchQuery: string | null
  currentTag: string | null
}

export const initialState = (): PostState => ({
  byIds: {},
  postSummaries: {},
  latestPosts: [],
  searchResult: [],
  tagResult: [],
  searchQuery: null,
  currentTag: null,
})
