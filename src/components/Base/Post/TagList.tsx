import * as tsx from 'vue-tsx-support'
import { css } from 'emotion'
import { bp } from '@/util/helpers'
import Empty from '@/components/Base/Empty'

export default tsx.component({
  name: 'TagList',
  props: {
    list: {
      type: Array as () => string[],
      required: true as true
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
          <li key={tag} class="tag">
            <nuxt-link to={this.tagPath(tag)}>{tag}</nuxt-link>
          </li>
        ))}
        {this.list.length < 1 ? (
          <li class="empty">
            <Empty />
          </li>
        ) : null}
      </ul>
    )
  }
})

const styles = {
  TagList: css`
    width: 90%;
    margin-bottom: 8px;
    text-align: center;
    ${bp.sm} {
      text-align: left;
    }

    .tag {
      display: inline;
      font-size: 16px;
      cursor: pointer;
      transition: 0.3s;
      ${bp.sm} {
        font-weight: normal;
      }
      &:not(:last-child):after {
        content: '/';
        margin: 0 8px;
        color: #222;
        transition: 0.3s ease-out;
      }
      a {
        color: #222;
      }
      &:hover a {
        text-decoration: underline;
      }
      &:focus a {
        text-decoration: underline;
      }
    }

    .empty {
      width: 240px;
      height: 24px;
    }
  `
}
