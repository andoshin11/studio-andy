import { IPostProps } from '@/entities/Post'

export interface IPostState {
  byIds: {
    [id: number]: IPostProps
  }
  latestPosts: string[]
  searchResult: string[]
  searchQuery: string | null
  currentPost: string | null
}

export const initialState = (): IPostState => ({
  byIds: {},
  latestPosts: [],
  searchResult: [],
  searchQuery: null,
  currentPost: null
})
