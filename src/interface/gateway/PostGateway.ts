import { PostData, SortableKey, Tag } from '@/domain/Post'
import { PostSummaryData } from '@/domain/PostSummary'

export default interface PostGateway {
  getPosts: (orderBy?: SortableKey, asSummary?: boolean) => Promise<PostData[]>
  getPostSummaries: () => Promise<PostSummaryData[]>
  getPost: (slug: PostData['slug']) => Promise<PostData>
  getPostsByTag: (tag: Tag) => Promise<PostSummaryData[]>
  searchPosts: (query: string) => Promise<PostSummaryData[]>
}
