import * as tsx from 'vue-tsx-support'
import { css } from 'emotion'
import { bp } from '@/util/helpers'
import PostEntity from '@/entities/Post'
import PostCard from '@/components/Modules/PostCard'

export default tsx.component({
  name: 'PostList',
  props: {
    data: {
      type: Array as () => PostEntity[],
      required: true as true
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
  mounted() {
    console.log('post list mounted')
    console.log(this.data)
  },
  render() {
    return (
      <div class={styles.PostList}>
        {this.data.map(post => (
          <nuxt-link key={post.props.slug} to={this.postPath(post)} class="post">
            <PostCard post={post} />
          </nuxt-link>
        ))}
      </div>
    )
  }
})

const styles = {
  PostList: css`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    ${bp.sm} {
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    .post {
      box-sizing: border-box;
      width: 50%;
      padding: 15px;
    }

    ${bp.sm} {
      .post {
        display: block;
        width: 100%;
        padding: 0;
      }
    }
  `
}
