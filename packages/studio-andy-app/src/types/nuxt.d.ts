import { ActionTree, ActionContext } from 'vuex'
import * as SentryNode from '@sentry/node'
import { Context } from '@nuxt/vue-app'

export type Logger = typeof SentryNode

declare module 'vuex/types/index' {
  interface ActionTree<S, R> {
    nuxtServerInit: (context: ActionContext<S, R>, nuxtContext: Context) => void
  }
}

declare module '@nuxt/vue-app/types/index' {
  interface Context {
    $sentry?: Logger
  }
}
