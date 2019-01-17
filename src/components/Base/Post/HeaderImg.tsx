import * as tsx from 'vue-tsx-support'
import { css } from 'emotion'
import Empty from '@/components/Base/Empty'
import PostEntity from '@/entities/Post'

export default tsx.component({
  name: 'HeaderImg',
  props: {
    post: {
      type: Object as () => PostEntity,
      default: null
    }
  },
  render() {
    return (
      <div class={styles.HeaderImg}>
        {this.post ? (
          <picture>
            <source srcset={this.post.props.headerImageLight.fields.file.url} class="img" type="image/webp" />
            <img src={this.post.props.headerImage.fields.file.url} alt={this.post.props.headerImage.fields.file.fileName} class="img" />
          </picture>
        ) : (
          <div class="empty">
            <Empty />
          </div>
        )}
      </div>
    )
  }
})

const styles = {
  HeaderImg: css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 24px;

    .img {
      width: 100%;
      max-height: 100%;
    }

    .empty {
      width: 100%;
      height: 620px;
    }

    @media screen and (max-width: 768px) {
      .empty {
        height: 196px;
      }
    }
  `
}
