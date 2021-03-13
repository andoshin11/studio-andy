import Post, { PostData, Tag, SortableKey } from '@/domain/Post'
import PostSummary, { PostSummaryData, SortableKey as PostSummarySortableKey } from '@/domain/PostSummary'

export default interface PostRepository {
  getPost: (slug: PostData['slug']) => Post | null
  getPosts: (orderBy?: SortableKey) => Post[]
  getPostSummaries: (orderBy?: PostSummarySortableKey, reverse?: boolean) => PostSummary[]
  savePosts: (posts: PostData[], orderBy?: SortableKey) => void
  savePostSummaries: (postSummaries: PostSummaryData[]) => void

  saveTagResult: (tag: Tag, posts: PostSummaryData[]) => void
  getCurrentTag: () => Tag | null
  getTagResult: () => PostSummary[]

  saveSearchResult: (query: string, postSummaries: PostSummaryData[]) => void
  getSearchQuery: () => string | null
  getSearchResult: () => PostSummary[]
}
