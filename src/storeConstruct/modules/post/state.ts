import { PostData } from '@/domain/Post'

export interface IPostState {
  byIds: {
    [slug: string]: PostData
  }
  latestPosts: string[]
  searchResult: string[]
  tagResult: string[]
  searchQuery: string | null
  currentTag: string | null
  currentPost: string | null
}

export const initialState = (): IPostState => ({
  byIds: {},
  latestPosts: [],
  searchResult: [],
  tagResult: [],
  searchQuery: null,
  currentTag: null,
  currentPost: null
})
