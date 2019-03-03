import * as tsx from 'vue-tsx-support'
import cx from 'classnames'
import styles from './styles.css'
import Icon from '@/components/Base/Icon'

interface IData {
  query: string
}

export default tsx.component({
  name: 'Header',
  beforeCreate() {
    if ((styles as any).__inject__) {
      ;(styles as any).__inject__(this.$ssrContext)
    }
  },
  props: {
    shrink: {
      type: Boolean,
      default: false
    }
  },
  data(): IData {
    return {
      query: ''
    }
  },
  methods: {
    searchPosts() {
      console.log('searching')
      if (!this.query || !this.$refs.input) return
      ;(this.$refs.input as HTMLElement).blur()
      this.$router.push({ path: `/search?query=${this.query}` })
      this.query = ''
    }
  },
  render(h) {
    return (
      <div class={cx(styles.Header, { [styles.shrink]: this.shrink })}>
        <div class={styles.inner}>
          <nuxt-link exact to="/" class={styles.logo}>
            Studio Andy
          </nuxt-link>
        </div>
        <form class={styles.search} role="search">
          {/* <form class={styles.search} role="search" onSubmit={tsx.modifiers.prevent(this.searchPosts)}> */}
          <input ref="input" value={this.query} onInput={e => (this.query = (e.target as any).value)} name="query" aria-label="query" type="text" class={styles.searchInput} />
          <button type="submit" aria-label="search" class={styles.searchButton}>
            <Icon name="search" />
          </button>
          <div class={styles.mask} />
        </form>
      </div>
    )
  }
})
