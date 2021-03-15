import * as SentryTypes from '@sentry/minimal'
import { Context } from '@nuxt/vue-app'
import { createResolver } from '@/di'

declare module 'vuex/types/index' {
  interface ActionTree<S, R> {
    nuxtServerInit: (context: ActionContext<S, R>, nuxtContext: Context) => void
  }
}

declare module '@nuxt/types/index' {
  interface Context {
    readonly $sentry: typeof SentryTypes
    $resolver: ReturnType<typeof createResolver>
  }
}
