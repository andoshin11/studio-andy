import { IPostProps } from '@/entities/Post'

export enum Types {
  STORE_POSTS = 'post/store_posts',
  STORE_LATEST_POSTS = 'post/store_latest_posts'
}

export class StorePosts implements FluxStandardAction {
  type = Types.STORE_POSTS
  constructor(public payload: IPostProps[]) {}
}

export class StoreLatestPosts implements FluxStandardAction {
  type = Types.STORE_LATEST_POSTS
  constructor(public payload: string[]) {}
}
