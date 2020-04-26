import * as tsx from 'vue-tsx-support'
import PostEntity from '@/entities/Post'
import styles from './styles.css'

export default tsx.component({
  name: 'SocialButtons',
  props: {
    pagePath: {
      type: String,
      required: true as true
    },
    post: {
      type: Object as () => PostEntity,
      required: true as true
    }
  },
  beforeCreate() {
    if ((styles as any).__inject__) {
      ;(styles as any).__inject__(this.$ssrContext)
    }
  },
  render(h) {
    return (
      <div class={styles.SocialButtons}>
        <a href={`http://b.hatena.ne.jp/entry/${this.pagePath}`} class={styles.socialButton}>
          <svg width="20px" height="40px" viewBox="0 0 141.732 141.732" enable-background="new 0 0 141.732 141.732">
            <use href="/hatena.svg#root" />
          </svg>
        </a>
        <a href={`http://twitter.com/share?url=${this.pagePath}&text=${this.post.props.title}`} class={styles.socialButton} target="_blank">
          <svg height="16" width="20" viewBox="0 0 20 16">
            <use href="/twitter.svg#root" />
          </svg>
        </a>
        <a href={`http://getpocket.com/edit?url=${this.pagePath}`} class={styles.socialButton} target="_blank">
          <svg width="20px" height="40px" viewBox="0 0 141.732 141.732" enable-background="new 0 0 141.732 141.732" xmlSpace="preserve">
            <use href="/pocket.svg#root" />
          </svg>
        </a>
      </div>
    )
  }
})
