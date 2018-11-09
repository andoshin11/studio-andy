import { IPostProps } from '@/entities/Post'

export interface IPostState {
  byIds: {
    [id: number]: IPostProps
  }
  latestPosts: string[]
}

export const initialState = (): IPostState => ({
  byIds: {},
  latestPosts: []
})
