import * as tsx from 'vue-tsx-support'
import Empty from '@/components/Base/Empty'
import styles from './styles.css'

export default tsx.component({
  name: 'TagList',
  props: {
    list: {
      type: Array as () => string[],
      required: true as true
    }
  },
  beforeCreate() {
    if ((styles as any).__inject__) {
      ;(styles as any).__inject__(this.$ssrContext)
    }
  },
  methods: {
    tagPath(tag: string): string {
      if (tag) {
        return `/tags/${tag}`
      }
      return ''
    }
  },
  render() {
    return (
      <ul class={styles.TagList}>
        {this.list.map(tag => (
          <li key={tag} class={styles.tag}>
            <nuxt-link to={this.tagPath(tag)}>{tag}</nuxt-link>
          </li>
        ))}
        {this.list.length < 1 ? (
          <li class={styles.empty}>
            <Empty />
          </li>
        ) : null}
      </ul>
    )
  }
})
