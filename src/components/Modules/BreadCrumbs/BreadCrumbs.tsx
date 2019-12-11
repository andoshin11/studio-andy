import * as tsx from 'vue-tsx-support'
import { BreadCrumb, parseBreadCrumbs } from '@/util/breadcrumbs'
import styles from './styles.css'

export default tsx.component({
  beforeCreate() {
    if ((styles as any).__inject__) {
      ;(styles as any).__inject__(this.$ssrContext)
    }
  },
  name: 'BreadCrumbs',
  computed: {
    breadCrumbs(): BreadCrumb[] {
      const route = this.$route
      return parseBreadCrumbs(route)
    } 
  },
  render(h) {
    return (
      <div>
        <ul>
          { this.breadCrumbs.map((breadCrumb, index) => (
            <li class={styles.listItem} key={index} >
              { breadCrumb.to ? (
                <nuxt-link to={ breadCrumb.to } >{ breadCrumb.name }</nuxt-link>
              ) : (
                <span>{ breadCrumb.name }</span>
              ) }
            </li>
          )) }
        </ul>
      </div>
    )
  }
})
