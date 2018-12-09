import { MutationTree } from 'vuex'
import { IPostState } from '@/store/modules/Post/state'
import { Types, StorePosts, StoreLatestPosts, StoreSearchResults, StoreCurrentPost, StoreSearchQuery, StoreCurrentTag, StoreTagResult } from '@/store/modules/Post/types'

export const mutations: MutationTree<IPostState> = {
  [Types.STORE_POSTS]: (state, action: StorePosts) => {
    const posts = action.payload
    posts.forEach(post => {
      state.byIds = {
        ...state.byIds,
        [post.slug]: post
      }
    })
  },
  [Types.STORE_LATEST_POSTS]: (state, action: StoreLatestPosts) => {
    const latestPosts = action.payload
    state.latestPosts = latestPosts
  },
  [Types.STORE_SEARCH_RESULTS]: (state, action: StoreSearchResults) => {
    const searchResults = action.payload
    state.searchResult = searchResults
  },
  [Types.STORE_TAG_RESULT]: (state, action: StoreTagResult) => {
    const tagResult = action.payload
    state.tagResult = tagResult
  },
  [Types.STORE_CURRENT_TAG]: (state, action: StoreCurrentTag) => {
    const currentTag = action.payload
    state.currentTag = currentTag
  },
  [Types.STORE_SEARCH_QUERY]: (state, action: StoreSearchQuery) => {
    const searchQuery = action.payload
    state.searchQuery = searchQuery
  },
  [Types.STORE_CURRENT_POST]: (state, action: StoreCurrentPost) => {
    const currentPost = action.payload
    state.currentPost = currentPost
  }
}
