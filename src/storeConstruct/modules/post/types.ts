import { PostData } from '@/domain/Post'

import { createRootTypes } from '@/storeConstruct/helper'

export const LocalTypes = {
  STORE_POSTS: 'store_posts',
  STORE_LATEST_POSTS: 'store_latest_posts',
  STORE_SEARCH_RESULTS: 'store_search_result',
  STORE_TAG_RESULT: 'store_tag_result',
  STORE_SEARCH_QUERY: 'store_search_query',
  STORE_CURRENT_TAG: 'store_current_tag',
  STORE_CURRENT_POST: 'store_current_post'
}

export const Types = createRootTypes('post', LocalTypes)

export class StorePosts implements FluxStandardAction {
  type = Types.STORE_POSTS
  constructor(public payload: PostData[]) {}
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
