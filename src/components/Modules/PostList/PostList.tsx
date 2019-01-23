import * as tsx from 'vue-tsx-support'
import PostEntity from '@/entities/Post'
import PostCard from '@/components/Modules/PostCard'
import styles from './styles.css'

export default tsx.component({
  name: 'PostList',
  props: {
    data: {
      type: Array as () => PostEntity[],
      required: true as true
    }
  },
  beforeCreate() {
    if ((styles as any).__inject__) {
      ;(styles as any).__inject__(this.$ssrContext)
    }
  },
  methods: {
    postPath(post: PostEntity): string {
      if (post) {
        return `/posts/${post.props.slug}`
      }
      return ''
    }
  },
  render() {
    return (
      <div class={styles.PostList}>
        {this.data.map(post => (
          <nuxt-link key={post.props.slug} to={this.postPath(post)} class={styles.post}>
            <PostCard post={post} />
          </nuxt-link>
        ))}
      </div>
    )
  }
})
