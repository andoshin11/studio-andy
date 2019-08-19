import * as tsx from 'vue-tsx-support'
import cx from 'classnames'
import { oneOf } from '@/util/helpers'
import styles from './styles.css'

export default tsx.component({
  name: 'Loading',
  props: {
    size: {
      type: String,
      default: 'md',
      validator: oneOf(['sm', 'md', 'lg'])
    },
    type: {
      type: String,
      default: 'light',
      validator: oneOf(['light', 'dark'])
    }
  },
  beforeCreate() {
    if ((styles as any).__inject__) {
      ;(styles as any).__inject__(this.$ssrContext)
    }
  },
  render(h) {
    return (
      <div class={cx((styles as any)[this.size], (styles as any)[this.type], styles.Loading)}>
        <div class={styles.Loading__Dot} />
        <div class={styles.Loading__Dot} />
        <div class={styles.Loading__Dot} />
      </div>
    )
  }
})
