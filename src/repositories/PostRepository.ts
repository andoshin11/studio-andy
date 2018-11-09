import { Store } from 'vuex'
import { RootState } from '@/store'
import { StoreLatestPosts, StorePosts } from '@/store/modules/Post/types'
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
    const ids = posts.map(movie => movie.id)

    this.savePosts(posts)
    this._store.commit(new StoreLatestPosts(ids))
  }

  getLatestPosts(): PostEntity[] {
    const ids = this._store.state.post.latestPosts
    const propsList = ids.map(id => this._store.state.post.byIds[id])
    const posts = propsList.map(props => new PostEntity(props))
    return posts
  }

  getPost(id: string): PostEntity | null {
    const post = this._store.state.post.byIds[id]
    return post ? new PostEntity(post) : null
  }
}
