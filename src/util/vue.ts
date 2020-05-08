import { getCurrentInstance, reactive, toRefs } from '@vue/composition-api'
import { MetaInfo } from 'vue-meta'

export const useContext = () => {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('This must be called within a setup function.')

  return vm.$nuxt.context
}

const createEmptyMeta = (): MetaInfo => {
  return {
    title: undefined,
    titleTemplate: undefined,
    htmlAttrs: undefined,
    headAttrs: undefined,
    bodyAttrs: undefined,

    base: undefined,

    meta: [],
    link: [],
    style: [],
    script: [],
    noscript: [],

    changed: undefined,
    afterNavigation: undefined
  }
}

export const useHead = (init: MetaInfo = {}) => {
  const meta = reactive<MetaInfo>({
    ...createEmptyMeta(),
    ...init
  })

  return {
    head: () => meta,
    useMeta: () => toRefs(meta)
  }
}
