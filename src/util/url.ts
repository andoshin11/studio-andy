import { Route } from 'vue-router'
import { routes as _routes } from '@/router'
import { RouteConfig } from '@/types/router'

// resolve route config recursively
export function resolveRoute(name: string, routes: RouteConfig[], parents: RouteConfig[] = []): { route: RouteConfig | null; parents: RouteConfig[] } {
  let _parents = parents
  let result: RouteConfig | null = null

  routes.some(route => {
    if (route.name === name) {
      result = route
      return true
    }

    // forward parents stack if children exist
    if (route.children) {
      const newParentsStack = [..._parents, route]
      const r = resolveRoute(name, route.children, newParentsStack)
      if (r.route) {
        result = r.route
        _parents = r.parents
        return true
      }
    }
  })

  return {
    route: result,
    parents: _parents
  }
}

export function buildUrl(name: string, args: Route['params'] | Route['query'] = {}): string {
  const { route, parents } = resolveRoute(name, _routes)
  if (!route) throw new Error(`Route: ${name} is not defined.`)
  const PARAMETER_REGEXP = /^:(.+)$/
  const usedKeys: string[] = []

  function transformPath(path: string) {
    return path
      .split('/')
      .map(p => {
        const match = p.match(PARAMETER_REGEXP)
        if (match) {
          const key = match[1]
          if (args[key] === undefined) throw new Error(`Parameter: ${key} is not defined.`)
          usedKeys.push(key)
          return args[key]
        } else {
          return p
        }
      })
      .join('/')
  }

  const parentPaths = parents.map(p => transformPath(p.path)).join('/')
  const path = transformPath(route.path)
  const base = parentPaths ? parentPaths + '/' + path : path

  const queries = args as Route['query']
  const queryParameterStr = Object.entries(queries)
    .filter(([key]) => !usedKeys.includes(key))
    .map(([key, val]) => `${key}=${val}`)
    .join('&')

  return base + (queryParameterStr ? '?' + queryParameterStr : '')
}
