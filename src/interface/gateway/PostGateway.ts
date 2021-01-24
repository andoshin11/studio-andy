import { PostData, SortableKey, Tag } from '@/domain/Post'

export default interface PostGateway {
  getPosts: (orderBy?: SortableKey) => Promise<PostData[]>
  getPost: (slug: PostData['slug']) => Promise<PostData>
  getPostsByTag: (tag: Tag) => Promise<PostData[]>
  searchPosts: (query: string) => Promise<PostData[]>
}
