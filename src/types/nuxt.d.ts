import * as SentryTypes from '@sentry/minimal'
import { Context } from '@nuxt/vue-app'

declare module 'vuex/types/index' {
  interface ActionTree<S, R> {
    nuxtServerInit: (context: ActionContext<S, R>, nuxtContext: Context) => void
  }
}

declare module 'vue/types/vue' {
  interface Vue {}
}

declare module '@nuxt/types/index' {
  interface Context {
    readonly $sentry: typeof SentryTypes
  }
}
