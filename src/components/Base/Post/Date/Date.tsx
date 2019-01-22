import * as tsx from 'vue-tsx-support'
import dayjs from 'dayjs'
import Empty from '@/components/Base/Empty'
import styles from './styles.css'

export default tsx.component({
  name: 'Date',
  props: {
    text: {
      type: String,
      required: true as true,
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
      <div class={styles.Date}>
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
