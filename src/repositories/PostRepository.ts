import { singleton, inject } from 'tsyringe'
import { Store } from '@/storeConstruct'
import PostRepository from '@/interface/repository/PostRepository'
import Post, { PostData, SortableKey, Tag } from '@/domain/Post'
import PostSummary, { PostSummaryData, SortableKey as PostSummarySortableKey } from '@/domain/PostSummary'
import { pluck, sortBy } from '@/util/helpers'

@singleton()
export default class PostRepositoryImpl implements PostRepository {
  constructor(@inject('Store') private _store: Store) {}

  getPostSummaries(orderBy: PostSummarySortableKey = 'publishedAt', reverse: boolean = false) {
    const dataList = Object.values(this._store.state.post.postSummaries)

    if (orderBy === 'publishedAt') {
      dataList.sort(sortBy('publishedAt'))
    } else {
      throw new Error(`unsupported sorting key: ${orderBy}`)
    }

    if (reverse) {
      dataList.reverse()
    }

    return dataList.filter(Boolean).map((data) => new PostSummary(data))
  }

  savePostSummaries(postSummaries: PostSummaryData[]) {
    this._store.commit('post/store_postSummaries', { postSummaries })
  }

  /**
   * Post
   */

  savePost(post: PostData) {
    this._store.commit('post/store_post', { post })
  }

  getPost(slug: PostData['slug']) {
    const data = this._store.state.post.byIds[slug]
    return data ? new Post(data) : null
  }

  /**
   * Tag
   */

  saveTagResult(tag: Tag, postSummaries: PostSummaryData[]) {
    const slugs = pluck(postSummaries, 'slug')
    this._store.commit('post/store_current_tag', { tag })
    this.savePostSummaries(postSummaries)
    this._store.commit('post/store_tag_result', { slugs })
  }

  getCurrentTag(): string | null {
    return this._store.state.post.currentTag
  }

  getTagResult(): PostSummary[] {
    const { state } = this._store
    const slugs = state.post.tagResult
    const dataList = slugs.map((slug) => state.post.postSummaries[slug])

    return dataList.map((props) => new PostSummary(props))
  }

  /**
   * Search
   */

  saveSearchResult(query: string, postSummaries: PostSummaryData[]) {
    const slugs = pluck(postSummaries, 'slug')
    this._store.commit('post/store_search_query', { query })
    this.savePostSummaries(postSummaries)
    this._store.commit('post/store_search_result', { slugs })
  }

  getSearchQuery(): string | null {
    return this._store.state.post.searchQuery
  }

  getSearchResult(): PostSummary[] {
    const slugs = this._store.state.post.searchResult
    const dataList = slugs.map((slug) => this._store.state.post.postSummaries[slug])

    return dataList.map((data) => new PostSummary(data))
  }
}
