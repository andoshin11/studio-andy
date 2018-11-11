import { IPostProps } from '@/entities/Post'

export interface IPostState {
  byIds: {
    [id: number]: IPostProps
  }
  latestPosts: string[]
  currentPost: string | null
}

export const initialState = (): IPostState => ({
  byIds: {},
  latestPosts: [],
  currentPost: null
})
