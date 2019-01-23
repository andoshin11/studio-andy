import Vue from 'vue'
import { Store, ActionTree, ActionContext } from 'vuex'
import { MetaInfo } from 'vue-meta'
import { Route } from 'vue-router'
import { Configuration } from 'webpack'
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
    fetch?: (context: ApplicationContext) => Promise<void>
    asyncData?: (context: ApplicationContext) => Promise<any>
    transition?: string | Transition | ((from: any, to: any) => string)
    scrollToTop?: boolean
    validate?: (context: ApplicationContext) => boolean
    middleware?: string | string[]
  }
}

export interface NuxtConfig {
  build: Partial<{
    analyze: boolean | Object
    babel: Object
    cache: boolean
    cssSourceMap: boolean
    devMiddleware: Object
    extend: (
      config: Configuration,
      ctx: {
        isDev: boolean
        isClient: boolean
        isServer: boolean
        loaders: boolean
      }
    ) => void
    extractCSS: boolean
    filenames: Object
    hotMiddleware: Object
    plugins: Object[]
    postcss: any
    publicPath: string
    ssr: boolean
    templates: Object[]
    watch: string[]
    loaders: any
  }>
  css: string[]
  env: { [key: string]: any }
  extensions: string[]
  feed: Array<
    Partial<{
      path: string
      create: (
        feed: {
          options: { title: string; link: string; description: string }
          addItem: (item: any) => void
          addCategory: (name: string) => void
          addContributor: (contributor: any) => void
        }
      ) => Promise<void>
      cacheTime: number
      type: 'rss2' | 'atom1' | 'json1'
      data: any
    }>
  >
  'google-analytics': { id: string }
  head: MetaInfo
  icon:
    | boolean
    | Partial<{
        iconSrc: string
        sizes: number[]
        accessibleIcons: boolean
        iconProperty: string
      }>
  loading: boolean | string | Partial<{ color: string; failedColor: string; height: string; throttle: number; duration: number; rtl: boolean }>
  manifest: Partial<{
    background_color: string
    description: string
    dir: 'ltr' | 'rtl' | 'auto'
    display: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser'
    icons: Array<Partial<{ sizes: string; src: string; type: string }>>
    lang: string
    name: string
    orientation: 'any' | 'natural' | 'landscape' | 'landscape-primary' | 'landscape-secondary' | 'portrait' | 'portrait-primary' | 'portrait-secondary'
    prefer_related_applications: boolean
    related_applications: Array<Partial<{ platform: string; url: string; id: string }>>
    scope: string
    short_name: string
    start_url: string
    theme_color: string
  }>
  mode: 'universal' | 'spa'
  modules: Array<string | Object>
  modulesDir: string[] | string
  plugins: Array<string | { src: string; ssr: boolean }>
  sentry: {
    dsn: string
  }
  sitemap: Partial<{
    exclude: string[]
    routes: (() => Promise<string[]>) | string[]
    path: string
    hostname: string
    generate: boolean
    cacheTime: number
    filter: () => string[]
    gzip: boolean
  }>
  srcDir: string
  workbox: Partial<{
    dev: boolean
    swURL: string
    importScripts: string[]
    offlineAssets: string[]
    offlinePage: string
    cachingExtensions: string
    routingExtensions: string
    config: Object
  }>
}
