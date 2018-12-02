import Vue from 'vue'
import { Store, ActionTree, ActionContext } from 'vuex'
import { Route } from 'vue-router'
import * as SentryNode from '@sentry/node'
import { RootState } from '@/store/index'
import { RequestOptions, ServerResponse } from 'http'

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
  req: RequestOptions
  res: ServerResponse
  redirect: (path: string) => void
  error: (params: { statusCode: number; message: string }) => void
  nuxtState: RootState
  beforeNuxtRender: Function
  $sentry?: Logger
}

declare module 'vuex/types/index' {
  interface ActionTree<S, R> {
    nuxtServerInit: (context: ActionContext<S, R>, nuxtContext: ApplicationContext) => void
  }
}

declare module 'vue/types/options' {
  interface Transition {
    name?: string
    mode?: 'in-out' | 'out-in'
    type?: 'transition' | 'animation'
    css?: boolean
    duration?: number
    enterClass?: string
    enterToClass?: string
    enterActiveClass?: string
    leaveClass?: string
    leaveToClass?: string
    leaveActiveClass?: string
  }

  interface ComponentOptions<V extends Vue> {
    head?: any
    watchQuery?: string[]
    layout?: string | ((context: ApplicationContext) => string)
    fetch?: (context: ApplicationContext) => void
    asyncData?: (context: ApplicationContext) => Promise<void>
    transition?: string | Transition | ((from: any, to: any) => string)
    scrollToTop?: boolean
    validate?: (context: ApplicationContext) => boolean
    middleware?: string | string[]
  }
}
