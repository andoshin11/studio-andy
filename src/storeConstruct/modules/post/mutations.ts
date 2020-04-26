import { MutationTree } from 'vuex'
import { IPostState } from './state'
import { LocalTypes, StorePosts, StoreLatestPosts, StoreSearchResults, StoreCurrentPost, StoreSearchQuery, StoreCurrentTag, StoreTagResult } from './types'

export const mutations: MutationTree<IPostState> = {
  [LocalTypes.STORE_POSTS]: (state, action: StorePosts) => {
    const posts = action.payload
    posts.forEach(post => {
      state.byIds = {
        ...state.byIds,
        [post.slug]: post
      }
    })
  },
  [LocalTypes.STORE_LATEST_POSTS]: (state, action: StoreLatestPosts) => {
    const latestPosts = action.payload
    state.latestPosts = latestPosts
  },
  [LocalTypes.STORE_SEARCH_RESULTS]: (state, action: StoreSearchResults) => {
    const searchResults = action.payload
    state.searchResult = searchResults
  },
  [LocalTypes.STORE_TAG_RESULT]: (state, action: StoreTagResult) => {
    const tagResult = action.payload
    state.tagResult = tagResult
  },
  [LocalTypes.STORE_CURRENT_TAG]: (state, action: StoreCurrentTag) => {
    const currentTag = action.payload
    state.currentTag = currentTag
  },
  [LocalTypes.STORE_SEARCH_QUERY]: (state, action: StoreSearchQuery) => {
    const searchQuery = action.payload
    state.searchQuery = searchQuery
  },
  [LocalTypes.STORE_CURRENT_POST]: (state, action: StoreCurrentPost) => {
    const currentPost = action.payload
    state.currentPost = currentPost
  }
}
