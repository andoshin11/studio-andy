import { Route } from 'vue-router'
import { routes } from '@/router'
import { RouteMeta } from '@/types/router'
import { buildUrl, resolveRoute } from '@/util/url'

export interface BreadCrumb {
  name: string
  to?: string
}

export function parseBreadCrumbs(route: Route): BreadCrumb[] {
  const { params, matched } = route
  const breadCrumbs: BreadCrumb[] = []

  // resolve parent nodes recursively
  function findParent(_parentName: string) {
    const { route: parent } = resolveRoute(_parentName, routes)
    if (!parent!.name) return
    if (parent!.meta!.breadCrumbs!.parentName) {
      findParent(parent!.meta!.breadCrumbs!.parentName)
    }

    breadCrumbs.push({
      name: parent!.meta!.breadCrumbs!.name,
      to: buildUrl(parent!.name, params)
    })
  }

  matched.forEach((match, index) => {
    if (!match.name) return
    const meta = (match.meta || {}) as RouteMeta
    if (!meta.breadCrumbs) return
    const { parentName, name } = meta.breadCrumbs

    if (parentName) {
      findParent(parentName)
    }

    // skip applying to-link for the last node
    const isLastIndex = index + 1 === matched.length

    breadCrumbs.push({
      name,
      to: isLastIndex ? undefined : buildUrl(match.name, params)
    })
  })
  return breadCrumbs
}
