import { MutationTree } from 'vuex'
import { IPostState } from '@/store/modules/Post/state'
import { Types, StorePosts, StoreLatestPosts } from '@/store/modules/Post/types'

export const mutations: MutationTree<IPostState> = {
  [Types.STORE_POSTS]: (state, action: StorePosts) => {
    const posts = action.payload
    posts.forEach(post => {
      state.byIds = {
        ...state.byIds,
        [post.id]: post
      }
    })
  },
  [Types.STORE_LATEST_POSTS]: (state, action: StoreLatestPosts) => {
    const latestPosts = action.payload
    state.latestPosts = latestPosts
  }
}
