import Vue from 'vue'
import { Store, ActionTree } from 'vuex'
import { Route } from 'vue-router'
import * as SentryNode from '@sentry/node'
import { RootState } from '@/store/index'
import { UA } from 'nuxt-user-agent'

export type Logger = typeof SentryNode

export interface ApplicationContext {
  app: Vue
  isClient: boolean
  isServer: boolean
  isStatic: boolean
  isDev: Boolean
  isHMR: Boolean
  route: Route
  store: Store<RootState>
  env: object
  params?: any
  query: any
  req: any
  res: any
  redirect: (path: string) => void
  error: Function
  nuxtState: RootState
  beforeNuxtRender: Function
  $sentry: Logger
  $ua: UA
}

declare module 'vuex/types/index' {
  interface ActionTree<S, R> {
    nuxtServerInit?: (context, nuxtContext: ApplicationContext) => void
  }
}

declare module 'vue/types/options' {
  interface Transition {
    name?: string
    mode?: 'in-out' | 'out-in'
    type?: 'transition' | 'animation'
    css?: string
    duration?: number
    enterClass?: string
    enterToClass?: string
    enterActiveClass?: string
    leaveClass?: string
    leaveToClass?: string
    leaveActiveClass?: string
  }

  interface ComponentOptions<V extends Vue> {
    watchQuery?: string[]
    layout?: string | ((context: ApplicationContext) => string)
    fetch?: (context: ApplicationContext) => void
    asyncData?: (context: ApplicationContext) => Promise<void>
    head?: object | (() => object)
    transition?: string | Transition | ((from: any, to: any) => string)
    scrollToTop?: boolean
    validate?: (context: ApplicationContext) => boolean
    middleware?: string | string[]
  }
}
