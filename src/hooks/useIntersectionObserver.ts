import { Ref, isRef } from '@nuxtjs/composition-api'

export const useIntersectionObserver = (el: Ref<Element | null> | Element | null, cb: IntersectionObserverCallback) => {
  const _el = isRef(el) ? el.value : el

  if (!process.client) {
    throw new Error('IntersectionObserver is only available on client side')
  }

  if (typeof IntersectionObserver !== 'function') {
    throw new Error('IntersectionObserver is not registered on window object')
  }

  if (!_el) {
    throw new Error('Target element not found')
  }

  const observer = new IntersectionObserver(cb)
  observer.observe(_el)
}
