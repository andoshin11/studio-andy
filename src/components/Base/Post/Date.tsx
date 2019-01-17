import * as tsx from 'vue-tsx-support'
import dayjs from 'dayjs'
import { css } from 'emotion'
import { bp } from '@/util/helpers'
import Empty from '@/components/Base/Empty'

export default tsx.component({
  name: 'Date',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    date(): string {
      if (this.text.length > 1) {
        return dayjs(this.text).format('MMM D, YYYY')
      }
      return ''
    }
  },
  render() {
    return (
      <div class={styles.date}>
        {this.text.length < 1 ? (
          <div class={styles.empty}>
            <Empty />
          </div>
        ) : null}
        {this.date}
      </div>
    )
  }
})

const styles = {
  date: css`
    width: 90%;
    margin-bottom: 24px;
    color: #222;
    font-size: 18px;
    font-style: italic;
    text-align: center;
    ${bp.sm} {
      margin-bottom: 8px;
      font-size: 14px;
      text-align: left;
    }
  `,
  empty: css`
    width: 64px;
    height: 27px;
    ${bp.sm} {
      height: 21px;
    }
  `
}
