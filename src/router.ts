import Vue from 'vue'
import Router, { Route } from 'vue-router'
import { RouteConfig } from '@/types/router'

function interopDefault<T extends { default: any }>(promise: Promise<T>) {
  return promise.then(m => m.default || m)
}

interface Position {
  x: number
  y: number
}

const _854e194a = () => interopDefault(import('../src/pages/search.vue' /* webpackChunkName: "pages/search" */))
const _109f9fab = () => interopDefault(import('../src/pages/posts/_slug.vue' /* webpackChunkName: "pages/posts/_slug" */))
const _3ac093b7 = () => interopDefault(import('../src/pages/tags/_id.vue' /* webpackChunkName: "pages/tags/_id" */))
const _f69b3822 = () => interopDefault(import('../src/pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function(to: Route, from: Route, savedPosition: Position | void): any {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position: Position | boolean | { selector: string } = false

  // if no children detected and scrollToTop is not explicitly disabled
  // @ts-ignore
  if (to.matched.length < 2 && to.matched.every(r => r.components.default.options.scrollToTop !== false)) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
    // @ts-ignore
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    // @ts-ignore
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        // @ts-ignore
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          // @ts-ignore
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export const routes: RouteConfig[] = [
  {
    path: '/search',
    component: _854e194a,
    name: 'search',
    meta: {
      breadCrumbs: {
        name: '検索',
        parentName: 'index'
      }
    }
  },
  {
    path: '/posts/:slug?',
    component: _109f9fab,
    name: 'posts-slug',
    meta: {
      breadCrumbs: {
        name: '記事詳細',
        parentName: 'index'
      }
    }
  },
  {
    path: '/tags/:id?',
    component: _3ac093b7,
    name: 'tags-id',
    meta: {
      breadCrumbs: {
        name: 'タグ検索',
        parentName: 'index'
      }
    }
  },
  {
    path: '/',
    component: _f69b3822,
    name: 'index',
    meta: {
      breadCrumbs: {
        name: '記事一覧'
      }
    }
  }
]

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes,
    fallback: false
  })
}
