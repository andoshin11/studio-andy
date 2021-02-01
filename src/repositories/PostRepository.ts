import { singleton, inject } from 'tsyringe'
import { Store } from '@/storeConstruct'
import PostRepository from '@/interface/repository/PostRepository'
import Post, { PostData, SortableKey, Tag } from '@/domain/Post'
import { pluck } from '@/util/helpers'

@singleton()
export default class PostRepositoryImpl implements PostRepository {
  constructor(@inject('Store') private _store: Store) {}

  getPosts(orderBy?: SortableKey) {
    const { state } = this._store
    let dataList: PostData[]

    if (typeof orderBy === 'undefined') {
      dataList = Object.values(state.post.byIds)
    } else if (orderBy === 'publishedAt') {
      const slugs = state.post.latestPosts
      dataList = slugs.map(slug => state.post.byIds[slug])
    } else {
      throw new Error(`unsupported sorting key: ${orderBy}`)
    }

    return dataList.filter(Boolean).map(data => new Post(data))
  }

  getPost(slug: PostData['slug']) {
    const data = this._store.state.post.byIds[slug]
    return data ? new Post(data) : null
  }

  savePosts(posts: PostData[], orderBy?: SortableKey) {
    this._store.commit('post/store_posts', { posts })

    if (orderBy === 'publishedAt') {
      const slugs = pluck(posts, 'slug')
      this._store.commit('post/store_latest_posts', { slugs })
    }
  }

  saveSearchResult(query: string, posts: PostData[]) {
    const slugs = pluck(posts, 'slug')
    this._store.commit('post/store_search_query', { query })
    this.savePosts(posts)
    this._store.commit('post/store_search_result', { slugs })
  }

  saveTagResult(tag: Tag, posts: PostData[]) {
    const slugs = pluck(posts, 'slug')
    this._store.commit('post/store_current_tag', { tag })
    this.savePosts(posts)
    this._store.commit('post/store_tag_result', { slugs })
  }

  getCurrentTag(): string | null {
    return this._store.state.post.currentTag
  }

  getSearchResult(): Post[] {
    const slugs = this._store.state.post.searchResult
    const dataList = slugs.map(slug => this._store.state.post.byIds[slug])
    const posts = dataList.map(props => new Post(props))
    return posts
  }

  getTagResult(): Post[] {
    const { state } = this._store
    const slugs = state.post.tagResult
    const dataList = slugs.map(slug => state.post.byIds[slug])
    const posts = dataList.map(props => new Post(props))
    return posts
  }

  getSearchQuery(): string | null {
    return this._store.state.post.searchQuery
  }
}
