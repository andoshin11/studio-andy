import { Store } from 'vuex'
import { RootState } from '@/store'
import { StoreLatestPosts, StorePosts, StoreCurrentPost, StoreSearchResults, StoreSearchQuery } from '@/store/modules/Post/types'
import PostEntity, { IPostProps } from '@/entities/Post'

export default class PostRepository {
  private _store: Store<RootState>

  constructor(store: Store<RootState>) {
    this._store = store
  }

  savePosts(posts: IPostProps[]) {
    this._store.commit(new StorePosts(posts))
  }

  saveLatestPosts(posts: IPostProps[]) {
    const slugs = posts.map(post => post.slug)

    this.savePosts(posts)
    this._store.commit(new StoreLatestPosts(slugs))
  }

  saveSearchResults(posts: IPostProps[]) {
    const slugs = posts.map(post => post.slug)

    this.savePosts(posts)
    this._store.commit(new StoreSearchResults(slugs))
  }

  saveSearchQuery(query: string) {
    this._store.commit(new StoreSearchQuery(query))
  }

  saveCurrentPost(post: IPostProps) {
    const slug = post.slug
    this.savePosts([post])
    this._store.commit(new StoreCurrentPost(slug))
  }

  getLatestPosts(): PostEntity[] {
    const slugs = this._store.state.post.latestPosts
    const propsList = slugs.map(slug => this._store.state.post.byIds[slug])
    const posts = propsList.map(props => new PostEntity(props))
    return posts
  }

  getSearchResults(): PostEntity[] {
    const slugs = this._store.state.post.searchResult
    const propsList = slugs.map(slug => this._store.state.post.byIds[slug])
    const posts = propsList.map(props => new PostEntity(props))
    return posts
  }

  getPost(slug: string): PostEntity | null {
    const post = this._store.state.post.byIds[slug]
    return post ? new PostEntity(post) : null
  }

  getCurrentPost(): PostEntity | null {
    const slug = this._store.state.post.currentPost
    if (!slug) return null

    const currentPost = this._store.state.post.byIds[slug]
    if (!currentPost) return null

    return new PostEntity(currentPost)
  }

  getSearchQuery(): string | null {
    return this._store.state.post.searchQuery
  }
}
