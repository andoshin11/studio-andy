import * as tsx from 'vue-tsx-support'
import { css } from 'emotion'
import { bp } from '@/util/helpers'
import Empty from '@/components/Base/Empty'

export default tsx.component({
  name: 'SampleHeader',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  render() {
    return (
      <h1 class={style.title}>
        {this.title.length > 1 ? (
          <div class={style.empty}>
            <Empty />
          </div>
        ) : null}
        {this.title}
      </h1>
    )
  }
})

const style = {
  title: css`
    width: 90%;
    min-height: 48px;
    margin: 0 0 24px;
    font-weight: bold;
    font-size: 32px;
    line-height: 1.2;
    text-align: center;
    ${bp.sm} {
      width: 90%;
      margin-bottom: 16px;
      font-size: 24px;
      line-height: 1.3;
      text-align: left;
    }
  `,
  empty: css`
    width: 100%;
    height: 48px;
    ${bp.sm} {
      height: 36px;
    }
  `
}
