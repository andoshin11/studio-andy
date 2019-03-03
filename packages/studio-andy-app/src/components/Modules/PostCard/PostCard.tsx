import * as tsx from 'vue-tsx-support'
import dayjs from 'dayjs'
import PostEntity from '@/entities/Post'
import { prerender } from '@/util/util'
import styles from './styles.css'

export default tsx.component({
  beforeCreate() {
    if ((styles as any).__inject__) {
      ;(styles as any).__inject__(this.$ssrContext)
    }
  },
  name: 'PostCard',
  props: {
    post: {
      type: Object as () => PostEntity,
      required: true as true
    }
  },
  computed: {
    publishedAt(): string {
      if (this.post) {
        const publishedAt = dayjs(this.post.props.publishedAt)
        return publishedAt.format('MMM D, YYYY')
      }
      return ''
    },
    headerImage(): string {
      const { headerImage } = this.post.props
      return headerImage ? headerImage.fields.file.url : ''
    },
    headerWebp(): string {
      const { headerImageLight } = this.post.props
      return headerImageLight ? headerImageLight.fields.file.url : ''
    }
  },
  methods: {
    tagPath(tag: string): string {
      if (tag) {
        return `/tags/${tag}`
      }
      return ''
    },
    prerender() {
      const href = `/posts/${this.post.props.slug}`
      prerender(href)
    }
  },
  render(h) {
    return (
      <div onMouseenter={this.prerender} class={styles.PostCard}>
        <div class={styles.header}>
          <picture>
            <source srcset={this.headerWebp} class={styles.img} type="image/webp" />
            <img src={this.headerImage} alt={this.post.props.title} class={styles.img} />
          </picture>
        </div>
        <div class={styles.body}>
          <span class={styles.date}>{this.publishedAt}</span>
          <div class={styles.title}>{this.post.props.title}</div>
          <ul class={styles.tagList}>
            {this.post.props.tags.map((tag, i) => (
              <li key={i} class={styles.tag}>
                <nuxt-link to={this.tagPath(tag)} tag="button">
                  {tag}
                </nuxt-link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
})
