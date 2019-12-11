import { RouteConfig as _RouteConfig } from 'vue-router'

export interface RouteMeta {
  breadCrumbs?: {
    name: string
    parentName?: string
  }
}

export type RouteConfig = Omit<_RouteConfig, 'meta'> & { meta?: RouteMeta }
