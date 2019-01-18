import * as tsx from 'vue-tsx-support'
import { css } from 'emotion'
import { bp } from '@/util/helpers'
import dayjs from 'dayjs'
import PostEntity from '@/entities/Post'
import { prerender } from '@/util/util'

export default tsx.component({
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
  render() {
    return (
      <div class={styles.PostCard} onMouseenter={this.prerender}>
        <div class="header">
          <picture>
            <source srcset={this.headerWebp} class="img" type="image/webp" />
            <img src={this.headerImage} alt={this.post.props.title} class="img" />
          </picture>
        </div>
        <div class="body">
          <span class="date">{this.publishedAt}</span>
          <div class="title">{this.post.props.title}</div>
          <ul class="tagList">
            {this.post.props.tags.map((tag, i) => (
              <li key={i} class="tag">
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

const styles = {
  PostCard: css`
    overflow: hidden;
    color: #222;
    border-radius: 16px;
    box-shadow: 2px 2px 40px -12px #999;
    transition: 0.3s ease-out;
    ${bp.sm} {
      margin: 0 20px 40px;
    }
    &:hover {
      box-shadow: 0 28.3px 88.94px rgba(67, 54, 102, 0.2);
    }

    .header {
      position: relative;
      width: 100%;
      overflow: hidden;
      background-color: #fefefe;
      border-radius: 16px 16px 0 0;
    }

    .header::before {
      content: '';
      display: block;
      padding-top: 50%;
    }

    .body {
      box-sizing: border-box;
      width: 100%;
      padding: 20px 25px;
      text-align: left;
      background-color: #fefefe;
    }

    ${bp.sm} {
      .body {
        padding: 16px;
      }
    }

    .img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate(-50%, -50%);
      transition: 0.4s ease-out;
    }

    ${bp.pc} {
      &:hover .img {
        transform: translate(-50%, -50%) scale(1.2);
      }
    }

    .date {
      display: inline-block;
      margin-bottom: 8px;
      font-size: 12px;
      font-family: 'M PLUS 1p', sans-serif, Hiragino Kaku Gothic Pro, Meiryo, MS PGothic, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', Arial, 'メイリオ';
      transition: 0.4s ease-out;
    }

    ${bp.pc} {
      &:hover .date {
        letter-spacing: 0.5px;
      }
    }

    .title {
      width: 100%;
      min-height: 72px;
      margin-bottom: 8px;
      font-weight: bold;
      font-size: 24px;
      font-family: Hiragino Kaku Gothic Pro, 'M PLUS 1p', sans-serif, Meiryo, MS PGothic, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', Arial, 'メイリオ';
      letter-spacing: 0.5px;
      transition: 0.4s ease-out;
    }

    ${bp.pc} {
      &:hover .title {
        letter-spacing: 0.75px;
      }
    }

    .tagList {
      width: 100%;
      margin-bottom: 16px;
      text-align: left;
    }

    ${bp.sm} {
      .tagList {
        margin-bottom: 8px;
      }
    }

    .tag {
      display: inline;
    }

    .tag:not(:last-child):after {
      content: '/';
      margin: 0 4px;
      transition: 0.3s ease-out;
    }

    .tag button {
      display: inline-block;
      font-size: 14px;
      background: transparent;
      border: none;
      cursor: pointer;
      transition: 0.4s ease-out;
      -webkit-appearance: none;
    }

    .tag:hover button,
    .tag:focus button {
      color: #ef6530;
      text-decoration: underline;
    }

    ${bp.sm} {
      .tag:hover button,
      .tag:focus button {
        letter-spacing: 0.5px;
      }
    }
  `
}
