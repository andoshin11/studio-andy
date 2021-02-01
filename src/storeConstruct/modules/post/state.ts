import { PostData } from '@/domain/Post'

export interface PostState {
  byIds: {
    [slug: string]: PostData
  }
  latestPosts: string[]
  searchResult: string[]
  tagResult: string[]
  searchQuery: string | null
  currentTag: string | null
}

export const initialState = (): PostState => ({
  byIds: {},
  latestPosts: [],
  searchResult: [],
  tagResult: [],
  searchQuery: null,
  currentTag: null
})
