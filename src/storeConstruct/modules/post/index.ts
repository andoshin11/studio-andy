import { initialState, PostState } from './state'
import { createTypeSafeModule } from '@/lib/vuex-type-kit'
import { PostData } from '@/domain/Post'
import { PostSummaryData } from '@/domain/PostSummary'

export * from './state'

export const postModule = createTypeSafeModule({
  namespaced: true,
  state: initialState,
  mutations: {
    store_posts: (state, payload: { posts: PostData[] }) => {
      const hash = payload.posts.reduce((acc, ac) => ((acc[ac.slug] = ac), acc), {} as PostState['byIds'])
      state.byIds = {
        ...state.byIds,
        ...hash,
      }
    },
    store_postSummaries: (state, payload: { postSummaries: PostSummaryData[] }) => {
      const hash = payload.postSummaries.reduce((acc, ac) => ((acc[ac.slug] = ac), acc), {} as PostState['postSummaries'])
      state.postSummaries = {
        ...state.postSummaries,
        ...hash,
      }
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
