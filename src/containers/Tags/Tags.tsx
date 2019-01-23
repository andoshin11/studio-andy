import * as tsx from 'vue-tsx-support'
import Presenter, { IPresenter } from './presenter'
import PostRepository from '@/repositories/PostRepository'
import PostList from '@/components/Modules/PostList'
import styles from './styles.css'

export default tsx.component({
  name: 'Tags',
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
          <span class={styles.query}>{this.presenter.tag}</span>
          カテゴリの記事 {this.presenter.postList.length}件
        </div>
        <div class={styles.PostList}>
          <PostList data={this.presenter.postList} />
        </div>
      </div>
    )
  }
})
