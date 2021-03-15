import { PostData, Tag } from '@/domain/Post'
import { PostSummaryData } from '@/domain/PostSummary'

export default interface PostGateway {
  getPostSummaries: () => Promise<PostSummaryData[]>
  getPost: (slug: PostData['slug']) => Promise<PostData>
  getPostsByTag: (tag: Tag) => Promise<PostSummaryData[]>
  searchPosts: (query: string) => Promise<PostSummaryData[]>
}
