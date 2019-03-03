import * as tsx from 'vue-tsx-support'
import styles from './styles.css'
import Empty from '@/components/Base/Empty'

export default tsx.component({
  name: 'Title',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  beforeCreate() {
    if ((styles as any).__inject__) {
      ;(styles as any).__inject__(this.$ssrContext)
    }
  },
  render(h) {
    return (
      <h1 class={styles.Title}>
        {this.title.length < 1 ? (
          <div class={styles.empty}>
            <Empty />
          </div>
        ) : null}
        {this.title}
      </h1>
    )
  }
})
