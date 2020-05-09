import { Location } from 'vue-router'

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
