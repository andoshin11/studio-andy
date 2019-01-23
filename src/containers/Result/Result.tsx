import * as tsx from 'vue-tsx-support'
import styles from './styles.css'

import Presenter, { IPresenter } from './presenter'
import PostRepository from '@/repositories/PostRepository'
import PostList from '@/components/Modules/PostList'

export default tsx.component({
  name: 'Result',
  beforeCreate() {
    if ((styles as any).__inject__) {
      ;(styles as any).__inject__(this.$ssrContext)
    }
  },
  computed: {
    presenter(): IPresenter {
      return Presenter({
        postRepository: new PostRepository(this.$store)
      })
    }
  },
  render() {
    return (
      <div class={styles.Result}>
        <div class={styles.summary}>
          <span class={styles.query}>{this.presenter.query}</span>
          の検索結果 {this.presenter.postList.length}件
        </div>
        <div class={styles.PostList}>
          <PostList data={this.presenter.postList} />
        </div>
      </div>
    )
  }
})
