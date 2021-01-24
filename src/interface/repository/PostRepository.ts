import Post, { PostData, Tag, SortableKey } from '@/domain/Post'

export default interface PostRepository {
  getPost: (slug: PostData['slug']) => Post | null
  getPosts: (orderBy?: SortableKey) => Post[]
  savePosts: (posts: PostData[], orderBy?: SortableKey) => void
  getTagResult: () => Post[]
  saveTagResult: (tag: Tag, posts: PostData[]) => void
  getSearchResult: () => Post[]
  saveSearchResult: (query: string, posts: PostData[]) => void
  getCurrentTag: () => Tag | null
  getSearchQuery: () => string | null
}
