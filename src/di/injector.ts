import 'reflect-metadata'
import { DependencyContainer } from 'tsyringe'
import { Context } from '@nuxt/types'
import { containerRegistry } from './registry'

export const injector = (container: DependencyContainer, context: Context) => {
  const registry = containerRegistry(context)

  for (const [key, val] of Object.entries(registry)) {
    const provider = val.provider

    if ('useValue' in provider) {
      container.register<any>(key, provider)
    } else if ('useClass' in provider) {
      if ('options' in val) {
        container.register<any>(key, provider, val.options)
      } else {
        container.register<any>(key, provider)
      }
    }
  }

  return container
}
