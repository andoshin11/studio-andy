import { IPostProps } from '@/entities/Post'

export enum Types {
  STORE_POSTS = 'post/store_posts',
  STORE_LATEST_POSTS = 'post/store_latest_posts',
  STORE_SEARCH_RESULTS = 'post/store_search_result',
  STORE_TAG_RESULT = 'post/store_tag_result',
  STORE_SEARCH_QUERY = 'post/store_search_query',
  STORE_CURRENT_TAG = 'post/store_current_tag',
  STORE_CURRENT_POST = 'post/store_current_post'
}

export class StorePosts implements FluxStandardAction {
  type = Types.STORE_POSTS
  constructor(public payload: IPostProps[]) {}
}

export class StoreLatestPosts implements FluxStandardAction {
  type = Types.STORE_LATEST_POSTS
  constructor(public payload: string[]) {}
}

export class StoreSearchResults implements FluxStandardAction {
  type = Types.STORE_SEARCH_RESULTS
  constructor(public payload: string[]) {}
}

export class StoreTagResult implements FluxStandardAction {
  type = Types.STORE_TAG_RESULT
  constructor(public payload: string[]) {}
}

export class StoreSearchQuery implements FluxStandardAction {
  type = Types.STORE_SEARCH_QUERY
  constructor(public payload: string) {}
}

export class StoreCurrentTag implements FluxStandardAction {
  type = Types.STORE_CURRENT_TAG
  constructor(public payload: string) {}
}

export class StoreCurrentPost implements FluxStandardAction {
  type = Types.STORE_CURRENT_POST
  constructor(public payload: string) {}
}
