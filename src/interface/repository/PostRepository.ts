import Post, { PostData, Tag, SortableKey } from '@/domain/Post'
import PostSummary, { PostSummaryData, SortableKey as PostSummarySortableKey } from '@/domain/PostSummary'

export default interface PostRepository {
  getPostSummaries: (orderBy?: PostSummarySortableKey, reverse?: boolean) => PostSummary[]
  savePostSummaries: (postSummaries: PostSummaryData[]) => void

  savePost: (post: PostData) => void
  getPost: (slug: PostData['slug']) => Post | null

  saveTagResult: (tag: Tag, posts: PostSummaryData[]) => void
  getCurrentTag: () => Tag | null
  getTagResult: () => PostSummary[]

  saveSearchResult: (query: string, postSummaries: PostSummaryData[]) => void
  getSearchQuery: () => string | null
  getSearchResult: () => PostSummary[]
}
