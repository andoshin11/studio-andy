import 'reflect-metadata'
import { container } from 'tsyringe'
import { Plugin } from '@nuxt/types'
import { injector, createResolver } from '@/di'

const plugin: Plugin = (context) => {
  // DI Container Initialization
  let _container = container.createChildContainer()
  _container = injector(_container, context)
  context.$resolver = createResolver(_container)
}

export default plugin
