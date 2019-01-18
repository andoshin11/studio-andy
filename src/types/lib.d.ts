import { TsxComponentAttrs } from 'vue-tsx-support'
import { Location } from 'vue-router'
import 'vue-tsx-support/enable-check'

interface RouterLinkProps {
  to: string | Location
  tag?: string
  exact?: boolean
  append?: boolean
  replace?: boolean
  activeClass?: string
  exactActiveClass?: string
  event?: string | string[]
}

interface RouterViewProps {
  name?: string
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'nuxt-link'?: TsxComponentAttrs<RouterLinkProps>
    }
  }
}
