import * as tsx from 'vue-tsx-support'
import styles from './styles.css'

export default tsx.component({
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true as true
    }
  },
  beforeCreate() {
    if ((styles as any).__inject__) {
      ;(styles as any).__inject__(this.$ssrContext)
    }
  },
  computed: {
    iconPath(): string {
      return `/${this.name}.svg#root`
    }
  },
  render() {
    return (
      <svg class={styles.Icon}>
        <use xlinkHref={this.iconPath} />
      </svg>
    )
  }
})
