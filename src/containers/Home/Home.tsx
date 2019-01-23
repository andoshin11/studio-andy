import * as tsx from 'vue-tsx-support'

import Presenter, { IPresenter, ListType } from './presenter'
import PostRepository from '@/repositories/PostRepository'
import PostList from '@/components/Modules/PostList'
import styles from './styles.css'

interface IData {
  listType: ListType
}

export default tsx.component({
  name: 'Home',
  data(): IData {
    return {
      listType: ListType.Latest
    }
  },
  beforeCreate() {
    if ((styles as any).__inject__) {
      ;(styles as any).__inject__(this.$ssrContext)
    }
  },
  computed: {
    presenter(): IPresenter {
      return Presenter({
        postRepository: new PostRepository(this.$store),
        listType: this.listType
      })
    }
  },
  render() {
    return (
      <div class={styles.Home}>
        <div class={styles.PostList}>
          <PostList data={this.presenter.postList} />
        </div>
      </div>
    )
  }
})
