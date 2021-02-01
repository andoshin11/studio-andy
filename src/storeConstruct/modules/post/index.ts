import { initialState } from './state'
import { createTypeSafeModule } from '@/lib/vuex-type-kit'
import { PostData } from '@/domain/Post'

export * from './state'

export const module = createTypeSafeModule({
  namespaced: true,
  state: initialState,
  mutations: {
    store_posts: (state, payload: { posts: PostData[] }) => {
      const { posts } = payload
      posts.forEach((post) => {
        state.byIds = {
          ...state.byIds,
          [post.slug]: post,
        }
      })
    },
    store_latest_posts: (state, payload: { slugs: string[] }) => {
      state.latestPosts = payload.slugs
    },
    store_search_result: (state, payload: { slugs: string[] }) => {
      state.searchResult = payload.slugs
    },
    store_tag_result: (state, payload: { slugs: string[] }) => {
      state.tagResult = payload.slugs
    },
    store_current_tag: (state, payload: { tag: string }) => {
      state.currentTag = payload.tag
    },
    store_search_query: (state, payload: { query: string }) => {
      state.searchQuery = payload.query
    },
  },
})

export const mutations = module.mutations
