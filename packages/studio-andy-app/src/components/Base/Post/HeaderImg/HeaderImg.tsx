import * as tsx from 'vue-tsx-support'
import Empty from '@/components/Base/Empty'
import PostEntity from '@/entities/Post'
import styles from './styles.css'

export default tsx.component({
  name: 'HeaderImg',
  props: {
    post: {
      type: Object as () => PostEntity | null,
      default: null
    }
  },
  beforeCreate() {
    if ((styles as any).__inject__) {
      ;(styles as any).__inject__(this.$ssrContext)
    }
  },
  render(h) {
    return (
      <div class={styles.HeaderImg}>
        {this.post ? (
          <picture>
            <source srcset={this.post.props.headerImageLight.fields.file.url} class={styles.img} type="image/webp" />
            <img src={this.post.props.headerImage.fields.file.url} alt={this.post.props.headerImage.fields.file.fileName} class={styles.img} />
          </picture>
        ) : (
          <div class={styles.empty}>
            <Empty />
          </div>
        )}
      </div>
    )
  }
})
